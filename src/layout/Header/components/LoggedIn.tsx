import { useEffect, useState } from 'react';
import S from './LoggedIn.module.css';
import { useNavigate } from 'react-router';
import { supabase } from '@/lib/SupabaseClient';
import useLoginStore from '@/lib/LoginState';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface LoggedInProps {
  src: string;
}

function LoggedIn({ src }: LoggedInProps) {
  const [isVisibleLoginBox, setIsVisibleLoginBox] = useState(false);
  const resetLogin = useLoginStore((state) => state.resetUser);
  const navigation = useNavigate();

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

  const handleVisibleLoginBox = () => {
    const nextIsVisibleLoginBox = !isVisibleLoginBox;

    setIsVisibleLoginBox(nextIsVisibleLoginBox);
  };

  const handleMoveToMyPage = () => {
    navigation('/bookmark');
    setIsVisibleLoginBox(false);
  };

  const handleLogoutAuth = async () => {
    await supabase.auth.signOut();
  };

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
        }
      });
  };

  const handleLogOut = () => {
    handleCheckLogout();
    setIsVisibleLoginBox(false);
  };

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
