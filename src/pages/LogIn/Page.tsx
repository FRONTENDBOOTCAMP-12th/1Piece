import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { supabase } from '@/lib/SupabaseClient';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import S from './Page.module.css';
import useLoginStore from '@/lib/LoginState';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import useProfileStore from '@/lib/UserProfileState';

function LogInPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUserInfo } = useLoginStore();
  const { setUserProfile } = useProfileStore();

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
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

      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError || !data.user || !data.session) {
        toast.error('이메일이나 비밀번호가 일치하지 않습니다.');
        return;
      }

      const { data: profileData } = await supabase
        .from('users')
        .select('*')
        .eq('auth_uid', data.user.id);

      setUserInfo(data.user ?? null);
      setUserProfile(profileData![0]);

      await Swal.fire({
        icon: 'success',
        title: '로그인 성공!',
        text: '메인 페이지로 이동합니다.',
        confirmButtonText: '확인',
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      console.error(`로그인 오류:`, error);
      toast.error('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={S.container}>
      <form onSubmit={handleLogin} className={S.loginForm}>
        <h1 className={S.title}>로그인</h1>
        <Input
          label="아이디"
          type="text"
          value={id}
          onChange={handleIdChange}
          className={S.loginInputBox}
        />
        <Input
          label="비밀번호"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className={S.loginInputBox}
        />
        <div className={S.findLink}>
          <a href="/find-id">아이디 찾기</a>
          &nbsp;|&nbsp;
          <a href="/find-password">비밀번호 찾기</a>
        </div>
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
