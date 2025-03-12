import S from './FindPw.module.css';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { supabase } from '@/lib/SupabaseClient';
import React from 'react';

interface NewPwProps {
  email: string;
  newPw: string;
  setNewPw: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

function NewPw({ email, newPw, setNewPw, setStep }: NewPwProps) {
  const handleSetNewPw = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPw.length < 6) {
      alert('비밀번호는 6자리 이상이어야 합니다.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .update({ new_pw: newPw })
        .eq('email', email);

      if (error) {
        alert('서버에서 오류가 발생했습니다.');
        console.log('Error:', error);
        return;
      }

      if (!data) {
        alert('비밀번호 업데이트가 실패했습니다. 다시 시도해 주세요.');
        console.log('Error:', error);
        console.log('Response Data:', data);
        return;
      }

      alert('새 비밀번호가 저장되었습니다.');
    } catch {
      alert('오류가 발생했습니다. 다시 시도해 주세요');
      setStep(2);
    }
  };

  return (
    <form onSubmit={handleSetNewPw} className={S.findPwForm}>
      <h1 className={S.title}>비밀번호재설정</h1>
      <Input
        label="새로운 비밀번호"
        type="password"
        value={newPw}
        onChange={(e) => setNewPw(e.target.value)}
      />
      <Button label="변경하기" />
    </form>
  );
}

export default NewPw;
