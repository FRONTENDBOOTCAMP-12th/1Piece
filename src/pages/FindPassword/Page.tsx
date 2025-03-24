import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { useNavigate } from 'react-router';
import S from './Page.module.css';
import { useState } from 'react';
import Swal from 'sweetalert2';

function FindPwPage() {
  const [email, setEmail] = useState('');
  const [newPw, setNewPw] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPw = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !newPw) {
      setError('이메일과 새 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const BACKEND_URL =
        import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:4000';

      const response = await fetch(`${BACKEND_URL}/reset-pw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPw }),
        credentials: 'include',
      });
      if (!response.ok) {
        const errorData: { error: string } = await response.json();
        setError(errorData.error || '비밀번호 재설정 실패');
        return;
      }

      const result: { message: string } = await response.json();

      setMessage(result.message || '비밀번호가 성공적으로 업데이트되었습니다.');
      await Swal.fire({
        icon: 'success',
        title: '비밀번호 변경 성공!',
        text: '메인 페이지로 이동합니다.',
        confirmButtonText: '확인',
      }).then(() => {
        navigate('/login');
      });
    } catch {
      setError('서버 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className={S.container}>
      <title>Quzelly | 비밀번호 변경</title>
      <form className={S.findPwForm} onSubmit={handleResetPw}>
        <h1 className={S.title}>비밀번호 찾기</h1>
        <Input
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="새 비밀번호"
          type="password"
          value={newPw}
          onChange={(e) => setNewPw(e.target.value)}
        />
        <Button
          label="비밀번호 변경"
          color={'secondary'}
          className={S.submitButton}
        />
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
}

export default FindPwPage;
