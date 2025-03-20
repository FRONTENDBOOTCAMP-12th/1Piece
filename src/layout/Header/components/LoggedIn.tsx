import { useEffect, useState } from 'react';
import S from './LoggedIn.module.css';
import { useNavigate } from 'react-router';
import { supabase } from '@/lib/SupabaseClient';
import useLoginStore from '@/lib/LoginState';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useProfileStore from '@/lib/UserProfileState';

interface LoggedInProps {
  src: string;
}

function LoggedIn({ src }: LoggedInProps) {
  // 로그아웃 창을 보여주기 위한 상태
  const [isVisibleLoginBox, setIsVisibleLoginBox] = useState(false);
  // 로그아웃 시 초기화
  const resetLogin = useLoginStore((state) => state.resetUser);
  const navigation = useNavigate();
  const resetUserProfile = useProfileStore((state) => state.resetUserProfile);

  // 화면 내부 어떤 영역을 클릭해도 로그아웃 창 숨김 처리
  useEffect(() => {
    if (!isVisibleLoginBox) {
      return;
    }

    const handleCloseLoginBox = () => {
      setIsVisibleLoginBox(false);
    };

    window.addEventListener('mousedown', handleCloseLoginBox);

    return () => {
      window.removeEventListener('mousedown', handleCloseLoginBox);
    };
  }, [isVisibleLoginBox]);

  // 프로필 사진 클릭 시 로그아웃 창의 상태 변경
  const handleVisibleLoginBox = () => {
    const nextIsVisibleLoginBox = !isVisibleLoginBox;

    setIsVisibleLoginBox(nextIsVisibleLoginBox);
  };

  // 마이페이지로 이동 버튼 클릭 시
  const handleMoveToMyPage = () => {
    navigation('/bookmark');
    setIsVisibleLoginBox(false);
  };

  // supabase 로그아웃 함수
  const handleLogoutAuth = async () => {
    await supabase.auth.signOut();
  };

  // 로그아웃 후 완료됐음을 알리는 sweetalert2
  const handleConfirmLogout = () => {
    withReactContent(Swal).fire({
      title: (
        <>
          <p style={{ marginBlock: '16px' }}>이용해주셔서 감사합니다</p>
          <img src="/images/jellyfish.png" alt="" />
        </>
      ),
      customClass: {
        confirmButton: 'confirmButton',
      },
    });
  };

  // sweetalert2를 이용한 로그아웃 여부 체크
  const handleCheckLogout = () => {
    withReactContent(Swal)
      .fire({
        title: (
          <>
            <p style={{ marginBlock: '16px' }}>로그아웃 하시겠습니까?</p>
            <img src="/images/jellyfish.png" alt="" />
          </>
        ),
        confirmButtonText: 'YES',
        showCancelButton: true,
        cancelButtonText: 'NO',
        customClass: {
          confirmButton: 'confirmButton',
          cancelButton: 'cancelButton',
          title: 'alertTitle',
        },
      })
      .then((res) => {
        if (res.isConfirmed) {
          handleLogoutAuth();
          resetLogin();
          handleConfirmLogout();
          resetUserProfile();
          navigation('/');
        }
      });
  };

  // 로그아웃 버튼 클릭 시
  const handleLogOut = () => {
    handleCheckLogout();
    setIsVisibleLoginBox(false);
  };

  // window에 할당된 이벤트를 무시
  // 이는 현재 ul 내부를 클릭해도 일어나는 것을 방지하기 위함
  const handleBoxClick = (event: React.MouseEvent<HTMLUListElement>) => {
    event.stopPropagation();
  };

  return (
    // 마이페이지로 이동(로그인 된 상태)
    <>
      <button
        type="button"
        aria-label="유저 정보 드랍다운"
        onClick={handleVisibleLoginBox}
      >
        <img src={src} alt="" className={S.headerProfile} />
      </button>
      {isVisibleLoginBox ? (
        <ul
          className={S.settingLoginInfo}
          onMouseDown={handleBoxClick}
          role="menu"
        >
          <li>
            <button
              type="button"
              onClick={handleLogOut}
              className={S.settingLoginInfoList}
            >
              로그아웃
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={handleMoveToMyPage}
              className={S.settingLoginInfoList}
            >
              마이페이지로
            </button>
          </li>
        </ul>
      ) : null}
    </>
  );
}

export default LoggedIn;
