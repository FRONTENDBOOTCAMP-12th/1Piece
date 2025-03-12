import S from './EditProfile.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import EmailAlarm from './EmailAlarm';
import ProfileImage from './ProfileImage';

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
}) {
  return (
    <div className={S.editProfileContainer}>
      <ProfileImage src={profile.profileImage} />

      <div className={S.inputWrapper}>
        <Input label="ID" name="user_id" value={profile.user_id} disabled />
        <Input
          label="닉네임"
          name="nickname"
          type="text"
          value={profile.nickname}
          onChange={onInputChange}
        />
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
          onBlur={onCheckPassword}
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
      </div>

      <EmailAlarm initialTime="12:00" isChecked={false} />
      <div className={S.buttonGroup}>
        <Button label="수정" color="tertiary" onClick={onSubmit} />
      </div>
    </div>
  );
}

export default EditProfile;
