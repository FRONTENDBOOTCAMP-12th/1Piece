import { useState } from 'react';
import S from './EditProfile.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import EmailAlarm from './EmailAlarm';
import ProfileImage from './ProfileImage';

interface ProfileState {
  imageSrc: string;
  username: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  nickname: string;
  email: string;
  emailAlarmTime: string;
  emailAlarmEnabled: boolean;
}

interface EditProfileProps {
  onSubmit: (profile: ProfileState) => void; // 외부에서 처리하도록 콜백 함수 추가
}

function EditProfile({ onSubmit }: EditProfileProps) {
  const [profile, setProfile] = useState<ProfileState>({
    imageSrc: '/dummy/dummy_profile.jpg',
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    nickname: '',
    email: '',
    emailAlarmTime: '12:00',
    emailAlarmEnabled: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProfileImageChange = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, imageSrc: imageUrl }));
  };

  const handleEmailAlarmSave = (time: string, checked: boolean) => {
    setProfile((prev) => ({
      ...prev,
      emailAlarmTime: time,
      emailAlarmEnabled: checked,
    }));
  };

  return (
    <div className={S.editProfileContainer}>
      {/* 프로필 이미지 */}
      <ProfileImage
        src={profile.imageSrc}
        onChange={handleProfileImageChange}
      />

      {/* 입력 폼 */}
      <div className={S.inputWrapper}>
        <Input
          label="ID"
          name="username"
          type="text"
          value={profile.username}
          onChange={handleInputChange}
        />
        <Input
          label="현재 비밀번호"
          name="currentPassword"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          value={profile.currentPassword}
          onChange={handleInputChange}
        />
        <Input
          label="새 비밀번호"
          name="newPassword"
          type="password"
          placeholder="새 비밀번호를 입력해 주세요"
          value={profile.newPassword}
          onChange={handleInputChange}
        />
        <Input
          label="새 비밀번호 확인"
          name="confirmPassword"
          type="password"
          placeholder="새 비밀번호를 다시 입력해 주세요"
          value={profile.confirmPassword}
          onChange={handleInputChange}
        />
        <Input
          label="닉네임"
          name="nickname"
          type="text"
          value={profile.nickname}
          onChange={handleInputChange}
        />
        <Input
          label="이메일"
          name="email"
          type="email"
          value={profile.email}
          onChange={handleInputChange}
        />
      </div>

      {/* 이메일 알람 설정 */}
      <EmailAlarm
        initialTime={profile.emailAlarmTime}
        isChecked={profile.emailAlarmEnabled}
        onSave={handleEmailAlarmSave}
      />

      {/* 버튼 */}
      <div className={S.buttonGroup}>
        <Button
          label="탈퇴"
          color="gray"
          onClick={() => console.log('회원 탈퇴')}
        />
        <Button
          label="수정"
          color="tertiary"
          onClick={() => onSubmit(profile)}
        />
      </div>
    </div>
  );
}

export default EditProfile;
