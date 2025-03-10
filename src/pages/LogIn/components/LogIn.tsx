import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { supabase } from '@/lib/SupabaseClient';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import S from './LogIn.module.css';

function LogInForm() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: users, error: profileError } = await supabase
      .from('users')
      .select('email')
      .eq('user_id', id)
      .single();

    if (profileError || !users) {
      setError('아이디가 존재하지 않습니다.');
      return;
    }
    const email = users.email ?? '';

    const { data: user, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError || !user) {
      setError('이메일이나 비밀번호가 일치하지 않습니다.');
      return;
    }

    navigate('/main');
  };

  return (
    <div className={S.container}>
      <form onSubmit={handleLogin} className={S.loginForm}>
        <h1 className={S.title}>로그인</h1>
        <Input
          label="id"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className={S.loginInputBox}
        />
        <Input
          label="pw"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={S.loginInputBox}
        />
        <div className={S.findLink}>
          <a href="/find-id">아이디 찾기</a>
          &nbsp;|&nbsp;
          <a href="/find-pw">비밀번호 찾기</a>
        </div>
        {error && <div>{error}</div>}
        <div className={S.buttonContainer}>
          <Button
            type="submit"
            label="로그인"
            color={'primary-2'}
            className={S.submitButton}
          />
          <Button
            type="button"
            label="회원가입"
            color={'tertiary'}
            className={S.submitButton}
            onClick={() => navigate('/sign-up')}
          />
        </div>
      </form>
    </div>
  );
}

export default LogInForm;
