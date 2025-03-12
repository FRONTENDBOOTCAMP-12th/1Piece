import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import S from './FindPw.module.css';

interface CheckEmailProps {
  id: string;
  email: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

function CheckEmail({ id, setId, email, setEmail, setStep }: CheckEmailProps) {
  const handleFindPw = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !id) {
      alert('이메일과 id를 입력해 주세요');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/reset-pw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, id }),
      });

      console.log(response);

      const result = await response.json();
      if (!response.ok) {
        alert(result.error || '일치하는 계정을 찾을 수 없습니다.');
        return;
      }

      alert('계정 확인 완료! 새 비밀번호를 입력하세요.');
      setStep(2);
    } catch {
      alert('오류가 발생했습니다. 다시 시도해 주세요');
    }
  };
  return (
    <form className={S.findPwForm} onSubmit={handleFindPw}>
      <h1 className={S.title}>비밀번호찾기</h1>
      <Input
        label="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="ID"
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <Button label="pw찾기" color={'secondary'} className={S.submitButton} />
    </form>
  );
}

export default CheckEmail;
