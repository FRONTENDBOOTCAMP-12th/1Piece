import { NavLink } from 'react-router';
import { BiPlus } from 'react-icons/bi';
import { RiInbox2Line } from 'react-icons/ri';
import { CiSearch } from 'react-icons/ci';
import S from './Header.module.css';
import RoundedButton from '@/components/RoundeButton/RoundedButton';
import { useState } from 'react';

interface HeaderProps {
  userProfile?: string | boolean;
}

function Header({ userProfile = false }: HeaderProps) {
  const [isLogin] = useState(!!userProfile);

  const handleSearch = () => {
    console.log(userProfile);
    console.log(123);
  };

  return (
    <header>
      <div className={S.headerContainer}>
        <div className={S.logoContainer}>
          <NavLink to="/">
            <img src="/icons/logo.svg" alt="홈으로 이동" className={S.logo} />
          </NavLink>
          <NavLink to="/">
            <RoundedButton color="tertiary" font="pretendard" size="regular">
              홈
            </RoundedButton>
          </NavLink>
          <NavLink to="/ProblemList">
            <RoundedButton color="darkgray" font="pretendard" size="regular">
              목록
            </RoundedButton>
          </NavLink>
        </div>
        <div className={S.userInfoContainer}>
          <form className={S.headerForm} action={handleSearch}>
            <label htmlFor="headerSearchBar" className="sr-only">
              검색
            </label>
            <input
              type="search"
              id="headerSearchBar"
              className={S.headerSearchBar}
            />
            <button type="submit" className={S.headerSearchBtn}>
              <CiSearch size={24} />
            </button>
          </form>
          <NavLink to="/createProblem">
            <div className={S.headerSearchIcon}>
              <BiPlus size={24} />
            </div>
          </NavLink>
          <NavLink to="/bookmark">
            <div className={S.headerSearchIcon}>
              <RiInbox2Line size={24} />
            </div>
          </NavLink>
          {isLogin ? (
            <NavLink to="/mypage">
              <img src="" alt="" className={S.headerProfile} />
            </NavLink>
          ) : (
            <NavLink to="/loginPage">
              <RoundedButton color="secondary" font="pretendard">
                로그인
              </RoundedButton>
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
