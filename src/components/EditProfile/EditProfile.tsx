import S from './EditProfile.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import EmailAlarm from './EmailAlarm';

interface ProfileState {
  user_id: string;
  nickname: string;
  email: string;
  alarm?: string | null; // 알람 시간 정보 추가
}

interface EditProfileProps {
  profile: ProfileState;
  newPassword: string;
  confirmNewPassword: string;
  nicknameError: string;
  passwordError: string;
  passwordSuccess: string;
  confirmPasswordError: string;
  confirmPasswordSuccess: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveChanges: (e: React.FormEvent) => void;
  onSaveAlarm: (time: string, checked: boolean) => void; // 알람 저장 함수 추가
}

function EditProfile({
  profile,
  newPassword,
  confirmNewPassword,
  nicknameError,
  passwordError,
  passwordSuccess,
  confirmPasswordError,
  confirmPasswordSuccess,
  onInputChange,
  onSaveChanges,
  onSaveAlarm,
}: EditProfileProps) {
  return (
    <div className={S.editProfileContainer}>
      <form
        className={S.inputBox}
        onSubmit={(e) => {
          e.preventDefault();
          onSaveChanges(e); // 통합된 저장 버튼
        }}
      >
        {/* ID 수정 불가 */}
        <Input
          label="ID"
          name="user_id"
          type="text"
          value={profile.user_id}
          className={S.inputBox}
          disabled
        />
        {/* 이메일 수정 불가*/}
        <Input
          label="이메일"
          name="email"
          type="email"
          value={profile?.email || ''}
          className={S.inputBox}
          disabled
        />
        {/* 닉네임 수정 */}
        <Input
          label="닉네임"
          name="nickname"
          type="text"
          value={profile?.nickname || ''}
          onChange={onInputChange}
          className={S.inputBox}
        />
        {nicknameError && <p className={S.errorMessage}>{nicknameError}</p>}
        {/* 알림 설정 */}

        <EmailAlarm
          initialTime={profile?.alarm ?? '09:00'} // 기존 알람 시간 또는 기본값
          isChecked={Boolean(profile?.alarm)} // null이면 false 처리
          onSave={onSaveAlarm} // props로 전달됨
        />
        {/* 비밀번호 변경 */}
        <div className={S.passwordChangeSection}>
          <Input
            label="새 비밀번호"
            name="newPassword"
            type="password"
            placeholder="영문+숫자 조합 8~16자"
            value={newPassword}
            onChange={onInputChange}
            className={S.inputBox}
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
            className={S.inputBox}
          />
          {confirmPasswordError ? (
            <p className={S.errorMessage}>{confirmPasswordError}</p>
          ) : confirmPasswordSuccess ? (
            <p className={S.successMessage}>{confirmPasswordSuccess}</p>
          ) : null}
        </div>

        {/* 수정 버튼 */}
        <div className={S.buttonGroup}>
          <Button label="수정" color="tertiary" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
