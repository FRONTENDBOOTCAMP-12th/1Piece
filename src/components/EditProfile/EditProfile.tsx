import S from './EditProfile.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import EmailAlarm from './EmailAlarm';

interface ProfileState {
  user_id: string;
  nickname: string;
  email: string;
}

interface EditProfileProps {
  profile: ProfileState;
  newPassword: string;
  confirmNewPassword: string;
  nicknameError: string;
  emailError: string;
  passwordError: string;
  passwordSuccess: string;
  confirmPasswordError: string;
  confirmPasswordSuccess: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveChanges: (e: React.FormEvent) => void;
}

function EditProfile({
  profile,
  newPassword,
  confirmNewPassword,
  nicknameError,
  emailError,
  passwordError,
  passwordSuccess,
  confirmPasswordError,
  confirmPasswordSuccess,
  onInputChange,
  onSaveChanges,
}: EditProfileProps) {
  return (
    <div className={S.editProfileContainer}>
      <form
        className={S.inputForm}
        onSubmit={(e) => {
          e.preventDefault();
          onSaveChanges(e); // 통합된 저장 버튼
        }}
      >
        {/* ID는 수정 불가 */}
        <Input
          label="ID"
          name="user_id"
          type="text"
          className={S.inputId}
          value={profile.user_id}
          disabled
        />

        {/* 닉네임 수정 */}
        <Input
          label="닉네임"
          name="nickname"
          type="text"
          value={profile?.nickname || ''}
          onChange={onInputChange}
        />
        {nicknameError && <p className={S.errorMessage}>{nicknameError}</p>}

        {/* 이메일 수정 */}
        <Input
          label="이메일"
          name="email"
          type="email"
          value={profile?.email || ''}
          onChange={onInputChange}
        />
        {emailError && <p className={S.errorMessage}>{emailError}</p>}

        {/* 알림 설정 (예시) */}
        <EmailAlarm initialTime="12:00" isChecked={false} />

        {/* 비밀번호 변경 섹션 */}
        <div className={S.passwordChangeSection}>
          <h3>비밀번호 변경</h3>

          <Input
            label="새 비밀번호"
            name="newPassword"
            type="password"
            placeholder="영문/숫자 조합 (8~16자)"
            value={newPassword}
            onChange={onInputChange}
          />
          {passwordError ? (
            <p className={S.errorMessage}>{passwordError}</p>
          ) : passwordSuccess ? (
            <p className={S.successMessage}>{passwordSuccess}</p>
          ) : null}

          <Input
            label="새 비밀번호 확인"
            name="confirmNewPassword"
            type="password"
            placeholder="새 비밀번호 다시 입력"
            value={confirmNewPassword}
            onChange={onInputChange}
          />
          {confirmPasswordError ? (
            <p className={S.errorMessage}>{confirmPasswordError}</p>
          ) : confirmPasswordSuccess ? (
            <p className={S.successMessage}>{confirmPasswordSuccess}</p>
          ) : null}
        </div>

        {/* ✅ 수정 버튼 하나로 통합! */}
        <div className={S.buttonGroup}>
          <Button label="수정" color="primary" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
