import { NavLink } from 'react-router';
import S from '../Header.module.css';

interface LoggedInProps {
  src: string;
}

function LoggedIn({ src }: LoggedInProps) {
  return (
    // 마이페이지로 이동(로그인 된 상태)
    <NavLink to="/bookmark">
      <img src={src} alt="마이페이지 이동" className={S.headerProfile} />
    </NavLink>
  );
}

export default LoggedIn;
