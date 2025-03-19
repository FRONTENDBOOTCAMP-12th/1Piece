import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import Button from '../Button/Button';

import S from './MyPageDiary.module.css';
import ProfileImage from '../EditProfile/ProfileImage';

interface MyPageDiaryProps {
  children: React.ReactNode;
  title?: string;
  activeButton?: number;
}

interface UserData {
  nickname: string;
  level: number;
  profileImage?: string;
}

function MyPageDiary({
  children,
  title = '',
  activeButton = 1,
}: MyPageDiaryProps) {
  const navigate = useNavigate();
  const [userInfo] = useState<UserData>({
    nickname: '김멋사',
    level: 999,
    profileImage: '/dummy/dummy_profile.jpg',
  });

  const handleProfileChange = (file: File) => {
    console.log('Profile image changed:', file);
  };

  return (
    <div className={S.diaryContainer}>
      <div className={S.leftDiary}>
        <div className={S.userInfo}>
          <p className={S.level}>LV.{userInfo.level}</p> |{' '}
          <p className={S.nickname}>{userInfo.nickname}</p>
        </div>

        <ProfileImage
          src={userInfo.profileImage ?? '/dummy/default_profile.jpg'}
          alt="유저 프로필 사진"
          onChange={handleProfileChange}
        />

        <div className={S.btnNavigate}>
          <Button
            label="라이브러리"
            color={activeButton === 1 ? 'tertiary' : 'dark-gray'}
            onClick={() => navigate('/bookmark')}
            className={S.customButton}
          />
          <Button
            label="출석과 보상"
            color={activeButton === 2 ? 'tertiary' : 'dark-gray'}
            onClick={() => navigate('/calendar')}
            className={S.customButton}
          />
          <Button
            label="개인정보 관리"
            color={activeButton === 3 ? 'tertiary' : 'dark-gray'}
            onClick={() => navigate('/edit-profile')}
            className={S.customButton}
          />
        </div>
      </div>
      <div className={S.rightDiary}>
        <h1 className={S.pageName}>{title}</h1>
        {children}
      </div>
      <div className={S.springContainer}>
        <div className={S.topSpringContainer}>
          <div />
          <div />
        </div>
        <div className={S.bottomSpringContainer}>
          <div />
          <div />
        </div>
      </div>
    </div>
  );
}

export default MyPageDiary;
