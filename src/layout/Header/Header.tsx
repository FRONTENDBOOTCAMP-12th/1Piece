import { NavLink } from 'react-router';
import { BiPlus } from 'react-icons/bi';
import { RiInbox2Line } from 'react-icons/ri';
import S from './Header.module.css';
import RoundedButton from '@/components/RoundedButton/RoundedButton';
import { useEffect, useState } from 'react';
import HeaderSearchBar from '@/layout/Header/components/HeaderSearchBar';
import LoggedOut from './components/LoggedOut';
import LoggedIn from './components/LoggedIn';
import { supabase } from '@/lib/SupabaseClient';
import { User } from '@supabase/supabase-js';

function Header() {
  // 로그인 상태
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setIsLogin(!!user);
    setUserInfo(user);
  };

  // useEffect를 사용한 렌더링 차이
  useEffect(() => {
    getUser();
  }, []);

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
          <NavLink to="/card-list">
            <RoundedButton color="darkgray" font="pretendard" size="regular">
              목록
            </RoundedButton>
          </NavLink>
        </div>

        <div className={S.userInfoContainer}>
          {/* 검색 컴포넌트 */}
          <HeaderSearchBar />
          {/* 문제 생성 페이지로 이동 */}
          {isLogin ? (
            <>
              <NavLink to="/card-create">
                <button type="button" className={S.headerCreateIcon}>
                  <BiPlus size={24} />
                </button>
              </NavLink>
              {/* 북마크 페이지로 이동 */}
              <NavLink to="/bookmark">
                <button type="button" className={S.headerBookMarkIcon}>
                  <RiInbox2Line size={24} />
                </button>
              </NavLink>
              <LoggedIn
                src={
                  supabase.storage
                    .from('profileImg/userProfile')
                    .getPublicUrl(`${userInfo?.id}.png`).data.publicUrl
                }
              />
            </>
          ) : (
            <>
              <LoggedOut />
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
