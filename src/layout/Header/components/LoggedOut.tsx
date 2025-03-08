import RoundedButton from '@/components/RoundedButton/RoundedButton';
import { NavLink } from 'react-router';

function LoggedOut() {
  return (
    // 로그인 페이지로 이동(로그인 되지 않은 상태)
    <NavLink to="/loginPage">
      <RoundedButton color="secondary" font="pretendard">
        로그인
      </RoundedButton>
    </NavLink>
  );
}

export default LoggedOut;
