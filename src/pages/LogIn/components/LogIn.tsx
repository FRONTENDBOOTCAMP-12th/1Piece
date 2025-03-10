import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { supabase } from '@/lib/SupabaseClient';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function LogInForm() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('email')
      .eq('userid', id)
      .single();

    if (profileError || !profiles) {
      setError('아이디가 존재하지 않습니다.');
      return;
    }
    const email = profiles.email ?? '';

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
    <form onSubmit={handleLogin}>
      <h1>로그인</h1>
      <Input
        label="id"
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <Input
        label="pw"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <div>{error}</div>}
      <Button type="submit" label="로그인" />
    </form>
  );
}

export default LogInForm;
