import S from './EditProfile.module.css';
import EmailAlarm from './EmailAlarm';
import Button from '../Button/Button';
import Input from '../Input/Input';

interface ProfileState {
  user_id: string;
  nickname: string;
  email: string;
}

interface EditProfileProps {
  profile: ProfileState;
  alarmTime: string | null;
  isAlarmEnabled: boolean;
  newPassword: string;
  confirmNewPassword: string;
  nicknameError: string;
  passwordError: string;
  passwordSuccess?: string;
  confirmPasswordError?: string;
  confirmPasswordSuccess: string;
  onAlarmToggle: () => void;
  onAlarmTimeChange: (time: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveChanges?: (e: React.FormEvent) => void;
  onDeleteAccount: () => void;
}

function EditProfile({
  profile,
  alarmTime,
  isAlarmEnabled,
  newPassword,
  confirmNewPassword,
  nicknameError,
  passwordError,
  passwordSuccess,
  confirmPasswordError,
  confirmPasswordSuccess,
  onAlarmToggle,
  onAlarmTimeChange,
  onSaveChanges,
  onInputChange,
  onDeleteAccount,
}: EditProfileProps) {
  return (
    <form className={S.editProfileContainer} onSubmit={onSaveChanges}>
      {/* ID 수정 불가 */}
      <Input
        label="ID"
        name="user_id"
        type="text"
        value={profile.user_id}
        disabled
      />
      {/* 이메일 수정 불가*/}
      <Input
        label="이메일"
        name="email"
        type="email"
        value={profile?.email || ''}
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

      {/* 비밀번호 변경 */}
      <Input
        label="새 비밀번호"
        name="newPassword"
        type="password"
        placeholder="영문+숫자 조합 8~16자"
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
      {/* 알림 설정 */}
      <EmailAlarm
        time={alarmTime ?? '09:00'}
        isChecked={isAlarmEnabled}
        onToggle={onAlarmToggle}
        onTimeChange={onAlarmTimeChange}
      />
      {/* 수정 버튼 */}
      <div className={S.buttonGroup}>
        <Button
          label="탈퇴"
          color="secondary"
          type="button"
          onClick={onDeleteAccount}
        />
        <Button label="수정" color="tertiary" type="submit" />
      </div>
    </form>
  );
}

export default EditProfile;
