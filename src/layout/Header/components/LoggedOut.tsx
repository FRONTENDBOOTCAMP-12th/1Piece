import RoundedButton from '@/components/RoundedButton/RoundedButton';
import { useNavigate } from 'react-router';

function LoggedOut() {
  const navigation = useNavigate();

  // NavLink -> useNavigate 사용
  const handleMoveToLogin = () => {
    navigation('/login');
  };

  return (
    // 로그인 페이지로 이동(로그인 되지 않은 상태)
    <RoundedButton
      color="secondary"
      font="pretendard"
      onClick={handleMoveToLogin}
    >
      로그인
    </RoundedButton>
  );
}

export default LoggedOut;
