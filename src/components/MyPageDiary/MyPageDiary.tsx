import ProfileImage from '@/components/EditProfile/ProfileImage';
import useProfileStore from '@/lib/UserProfileState';
import { useNavigate } from 'react-router';
import S from './MyPageDiary.module.css';
import Button from '../Button/Button';
import { useState } from 'react';

interface MyPageDiaryProps {
  children: React.ReactNode;
  title?: string;
  activeButton?: number;
}

function MyPageDiary({
  children,
  title = '',
  activeButton = 1,
}: MyPageDiaryProps) {
  const navigate = useNavigate();
  const userProfile = useProfileStore((state) => state.userProfile);
  const [src] = useState('/dummy/dummy_profile.png');

  return (
    <div className={S.diaryContainer}>
      <div className={S.leftDiary}>
        <div className={S.userInfo}>
          <p className={S.level}>LV.{userProfile?.level}</p> |{' '}
          <p className={S.nickname}>{userProfile?.nickname}</p>
        </div>

        <ProfileImage
          id={userProfile!.id}
          src={src}
          alt={userProfile?.nickname}
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
