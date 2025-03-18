import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { supabase } from '@/lib/SupabaseClient';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import S from './Page.module.css';
import useLoginStore from '@/lib/LoginState';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

function LogInPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error] = useState('');
  const navigate = useNavigate();
  const { setUserInfo } = useLoginStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: users, error: userError } = await supabase
      .from('users')
      .select('email')
      .eq('user_id', id)
      .single();

    if (userError || !users) {
      toast.error('아이디가 존재하지 않습니다.');
      return;
    }
    const email = users.email ?? '';

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError || !data.user) {
      toast.error('이메일이나 비밀번호가 일치하지 않습니다.');
      return;
    }

    Swal.fire({
      icon: 'success',
      title: '로그인 성공!',
      text: '메인 페이지로 이동합니다.',
      confirmButtonText: '확인',
    });

    setUserInfo(data.user);

    navigate('/');
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
          <a href="/find-password">비밀번호 찾기</a>
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
      <Toaster position="bottom-right" />
    </div>
  );
}

export default LogInPage;
