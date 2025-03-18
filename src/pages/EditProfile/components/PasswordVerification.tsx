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
    <div className={S.editProfileContainer}>
      <form className={S.inputForm}>
        <h2 className="sr-only">개인정보 관리</h2>
        <label htmlFor="password" className="sr-only">
          현재 비밀번호 입력
        </label>
        <Input
          label=""
          name="password"
          type="password"
          placeholder="현재 비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={S.inputBox}
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
    </div>
  );
}

export default PasswordVerification;
