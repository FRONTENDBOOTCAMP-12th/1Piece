import { NavLink } from 'react-router';
import { BiPlus } from 'react-icons/bi';
import { RiInbox2Line } from 'react-icons/ri';
import S from './Header.module.css';
import RoundedButton from '@/components/RoundedButton/RoundedButton';
import { useEffect, useState } from 'react';
import HeaderSearchBar from '@/layout/Header/components/HeaderSearchBar';
import LoggedOut from './components/LoggedOut';
import LoggedIn from './components/LoggedIn';

// 유저 프로필 사진을 props로 전달
interface HeaderProps {
  src?: string;
}

function Header({ src }: HeaderProps) {
  // 로그인 상태
  const [isLogin, setIsLogin] = useState(false);

  // useEffect를 사용한 렌더링 차이
  useEffect(() => {
    const nextIsLogin = Boolean(src);
    setIsLogin(nextIsLogin);
  }, [src]);

  return (
    <header className={S.header}>
      <div className={S.headerContainer}>
        <div className={S.logoContainer}>
          {/* react-router를 활용한 링크 이동 */}
          {/* 로고와 홈 버튼 모두 홈으로 이동 */}
          <NavLink to="/">
            <img src="/icons/logo.svg" alt="홈으로 이동" className={S.logo} />
          </NavLink>
          <NavLink to="/">
            <RoundedButton color="tertiary" font="pretendard" size="regular">
              홈
            </RoundedButton>
          </NavLink>
          {/* 문제 목록 페이지로 이동 */}
          <NavLink to="/problem-list">
            <RoundedButton color="darkgray" font="pretendard" size="regular">
              목록
            </RoundedButton>
          </NavLink>
        </div>

        <div className={S.userInfoContainer}>
          {/* 검색 컴포넌트 */}
          <HeaderSearchBar />
          {/* 문제 생성 페이지로 이동 */}
          <NavLink to="/question-create">
            <div className={S.headerSearchIcon}>
              <BiPlus size={24} />
            </div>
          </NavLink>
          {/* 북마크 페이지로 이동 */}
          <NavLink to="/bookmark">
            <div className={S.headerSearchIcon}>
              <RiInbox2Line size={24} />
            </div>
          </NavLink>
          {/* 로그인 상태에 따른 헤더 렌더링 다르게 */}
          {isLogin ? (
            // 마이페이지로 이동(로그인 된 상태)
            <LoggedIn src={src!} />
          ) : (
            <LoggedOut />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
