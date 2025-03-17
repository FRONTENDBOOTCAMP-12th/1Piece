import { useState } from 'react';
import S from './EditProfile.module.css';
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
    <div className={S.editProfileContainer}>
      <form className={S.inputForm}>
        <Input
          label=""
          name="password"
          type="password"
          placeholder="현재 비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p className={S.errorMessage}>{passwordError}</p>}
      </form>

      <div className={S.buttonGroup}>
        <Button
          label="확인"
          color="primary"
          onClick={() => onVerify(password)}
        />
      </div>
    </div>
  );
}

export default PasswordVerification;
