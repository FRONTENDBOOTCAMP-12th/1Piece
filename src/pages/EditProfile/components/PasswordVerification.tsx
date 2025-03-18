import { useState } from 'react';
import S from './EditProfileContainer.module.css';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';

interface PasswordVerificationProps {
  onVerify: (password: string) => void;
  passwordError: string;
}

function PasswordVerification({
  onVerify,
  passwordError,
}: PasswordVerificationProps) {
  const [password, setPassword] = useState('');

  return (
    <form className={S.inputForm}>
      <Input
        label=""
        name="password"
        type="password"
        placeholder="현재 비밀번호를 입력하세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={S.inputBox}
        hiddenLabel={true}
      />
      {passwordError && (
        <p id="password-error" className={S.errorMessage} aria-live="polite">
          {passwordError}
        </p>
      )}
      <div className={S.buttonGroup}>
        <Button
          label="확인"
          color="primary"
          onClick={() => onVerify(password)}
        />
      </div>
    </form>
  );
}

export default PasswordVerification;
