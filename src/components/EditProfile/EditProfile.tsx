import S from './EditProfile.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import EmailAlarm from './EmailAlarm';
import ProfileImage from './ProfileImage';

interface ProfileState {
  user_id: string;
  nickname: string;
  email: string;
  profileImage: string;
}

interface EditProfileProps {
  profile: ProfileState;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onCheckPassword: (password: string) => void;
  isPasswordVerified: boolean;
  passwordError: string;
  passwordSuccess: string;
  nicknameError: string;
}

function EditProfile({
  profile,
  currentPassword,
  newPassword,
  confirmNewPassword,
  onInputChange,
  onSubmit,
  onCheckPassword,
  isPasswordVerified,
  passwordError,
  passwordSuccess,
  nicknameError,
}: EditProfileProps) {
  return (
    <div className={S.editProfileContainer}>
      <ProfileImage src={profile.profileImage} />

      <form className={S.inputForm}>
        <Input
          label="ID"
          name="user_id"
          type="id"
          className={S.inputId}
          value={profile.user_id}
          disabled
        />
        <Input
          label="닉네임"
          name="nickname"
          type="text"
          value={profile.nickname}
          onChange={onInputChange}
        />
        {/* 닉네임 에러 메시지 추가 */}
        {nicknameError && (
          <p className={S.errorMessage}>{nicknameError}</p>
        )}{' '}
        <Input
          label="이메일"
          name="email"
          type="email"
          value={profile.email}
          onChange={onInputChange}
        />
        <Input
          label="현재 비밀번호"
          name="currentPassword"
          type="password"
          placeholder="현재 비밀번호 입력"
          value={currentPassword}
          onChange={onInputChange}
          onBlur={(e) => onCheckPassword(e.target.value)}
        />
        <Input
          label="새 비밀번호"
          name="newPassword"
          type="password"
          placeholder="새 비밀번호 입력"
          value={newPassword}
          onChange={onInputChange}
          disabled={!isPasswordVerified}
          className={!isPasswordVerified ? S.disabledInput : ''}
        />
        <Input
          label="새 비밀번호 확인"
          name="confirmNewPassword"
          type="password"
          placeholder="새 비밀번호 다시 입력"
          value={confirmNewPassword}
          onChange={onInputChange}
          disabled={!isPasswordVerified}
          className={!isPasswordVerified ? S.disabledInput : ''}
        />
        {passwordError && <p className={S.errorMessage}>{passwordError}</p>}
        {passwordSuccess && (
          <p className={S.successMessage}>{passwordSuccess}</p>
        )}
      </form>

      {/* 이메일 알람 설정 */}
      <EmailAlarm initialTime="12:00" isChecked={false} />

      <div className={S.buttonGroup}>
        <Button
          label="탈퇴"
          color="gray"
          onClick={() => console.log('회원 탈퇴')}
        />
        <Button label="수정" color="tertiary" onClick={() => onSubmit()} />
      </div>
    </div>
  );
}

export default EditProfile;
