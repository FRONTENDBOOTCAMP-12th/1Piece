import S from './FindPw.module.css';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
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
      const response = await fetch('http://localhost:4000/reset-pw', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPw }),
      });

      const result = await response.json();
      if (!response.ok) {
        alert(result.error || '비밀번호 변경 실패');
        return;
      }

      alert('새 비밀번호가 저장되었습니다. 로그인 페이지로 이동하세요.');
      setStep(1);
    } catch {
      alert('오류가 발생했습니다. 다시 시도해 주세요.');
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
