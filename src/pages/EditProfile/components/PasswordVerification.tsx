import S from './PasswordVerification.module.css';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { useState } from 'react';

interface PasswordVerificationProps {
  onVerify: (password: string) => void;
  passwordError: string;
}

function PasswordVerification({
  onVerify,
  passwordError,
}: PasswordVerificationProps) {
  const [state, setState] = useState({
    password: '',
    localError: '',
  });

  // 입력값 변경 핸들러 (에러 메시지 초기화 포함)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ password: e.target.value, localError: '' });
  };

  // 폼 제출 핸들러 (비밀번호 검증)
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();

    if (!state.password.trim()) {
      setState((prev) => ({ ...prev, localError: '비밀번호를 입력해주세요.' }));
      return;
    }

    setState((prev) => ({ ...prev, localError: '' })); // 에러 초기화
    onVerify(state.password);
  };

  return (
    <form className={S.inputForm} onSubmit={handleVerify}>
      <Input
        label="현재 비밀번호 입력"
        hiddenLabel={true}
        name="password"
        type="password"
        placeholder="현재 비밀번호를 입력하세요"
        value={state.password}
        onChange={handleChange}
        className={S.inputBox}
      />
      {(state.localError || passwordError) && (
        <p id="password-error" className={S.errorMessage} aria-live="polite">
          {state.localError || passwordError}
        </p>
      )}
      <div className={S.buttonGroup}>
        <Button label="확인" color="primary" type="submit" />
      </div>
    </form>
  );
}

export default PasswordVerification;
