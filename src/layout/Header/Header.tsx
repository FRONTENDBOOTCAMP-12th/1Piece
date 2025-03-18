import { NavLink, useNavigate } from 'react-router';
import { BiPlus } from 'react-icons/bi';
import { RiInbox2Line } from 'react-icons/ri';
import S from './Header.module.css';
import RoundedButton from '@/components/RoundedButton/RoundedButton';
import HeaderSearchBar from '@/layout/Header/components/HeaderSearchBar';
import LoggedOut from './components/LoggedOut';
import LoggedIn from './components/LoggedIn';
import { supabase } from '@/lib/SupabaseClient';
import useLoginStore from '@/lib/LoginState';

function Header() {
  // 로그인 상태
  const userInfo = useLoginStore((state) => state.userInfo);
  const navigate = useNavigate();

  // NavLink를 사용하지 않은 링크 이동
  const handleMoveToHome = () => {
    navigate('/');
  };

  const handleMoveToCardList = () => {
    navigate('/card-list');
  };

  const handleMoveToCardCreate = () => {
    navigate('/card-create');
  };

  const handleMoveToBookMark = () => {
    navigate('/bookmark');
  };

  return (
    <header className={S.header}>
      <div className={S.headerContainer}>
        <div className={S.logoContainer}>
          {/* react-router를 활용한 링크 이동 */}
          {/* 로고와 홈 버튼 모두 홈으로 이동 */}
          <NavLink to="/">
            <img src="/icons/logo.svg" alt="홈으로 이동" className={S.logo} />
          </NavLink>
          <RoundedButton
            color="tertiary"
            font="pretendard"
            size="regular"
            onClick={handleMoveToHome}
          >
            홈
          </RoundedButton>
          {/* 문제 목록 페이지로 이동 */}

          <RoundedButton
            color="darkgray"
            font="pretendard"
            size="regular"
            onClick={handleMoveToCardList}
          >
            목록
          </RoundedButton>
        </div>

        <div className={S.userInfoContainer}>
          {/* 검색 컴포넌트 */}
          <HeaderSearchBar />
          {/* 로그인 상태에 따른 UI 변동 */}
          {userInfo ? (
            <>
              <button
                type="button"
                className={S.headerCreateIcon}
                aria-label="문제 생성 페이지로 이동"
                onClick={handleMoveToCardCreate}
              >
                <BiPlus size={24} />
              </button>
              {/* 북마크 페이지로 이동 */}
              <button
                type="button"
                className={S.headerBookMarkIcon}
                aria-label="북마크로 이동"
                onClick={handleMoveToBookMark}
              >
                <RiInbox2Line size={24} />
              </button>
              <LoggedIn
                src={
                  supabase.storage
                    .from('profileImg/userProfile')
                    .getPublicUrl(`${userInfo?.id}.png`).data.publicUrl
                }
              />
            </>
          ) : (
            <LoggedOut />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
