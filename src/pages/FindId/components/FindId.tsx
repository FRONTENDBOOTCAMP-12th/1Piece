import { supabase } from '@/lib/SupabaseClient';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import S from './FindId.module.css';

function FindIdForm() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleFindId = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert('이메일을 입력해주세요');
      return;
    }
    try {
      const { data, error } = await supabase
        .from('users')
        .select('user_id')
        .eq('email', email)
        .single();

      if (error) throw error;
      if (data) {
        alert(`입력하신 email로 가입하신 ID는 ${data.user_id}입니다`);
        navigate('/login');
      } else {
        alert('해당 email로 등록된 아이디가 없습니다.');
        setEmail('');
      }
    } catch {
      alert('아이디 찾기에 실패했습니다');
      setEmail('');
    }
  };

  return (
    <div className={S.container}>
      <form className={S.findIdForm} onSubmit={handleFindId}>
        <h1 className={S.title}>아이디찾기</h1>
        <Input
          label="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button label="id찾기" color={'secondary'} className={S.submitButton} />
      </form>
    </div>
  );
}

export default FindIdForm;
