import React from 'react';
import { useNavigate } from 'react-router';

import Button from '../Button/Button';

import S from './MyPageDiary.module.css';

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

  return (
    <div className={S.diaryContainer}>
      <div className={S.leftDiary}>
        <div className={S.userInfo}>
          <p className={S.level}>LV.999 </p> |{' '}
          <p className={S.nickname}>김멋사 </p>
        </div>

        <img
          src="/dummy/dummy_profile.jpg"
          alt="유저 프로필 사진"
          className={S.diaryProfile}
        />
        <div className={S.btnNavigate}>
          <Button
            label="라이브러리"
            color={activeButton === 1 ? 'tertiary' : 'dark-gray'}
            onClick={() => navigate('/bookmark')}
            className={S.customButton} // className 추가
          />
          <Button
            label="출석과 보상"
            color={activeButton === 2 ? 'tertiary' : 'dark-gray'}
            onClick={() => navigate('/calendar')}
            className={S.customButton} // className 추가
          />
          <Button
            label="개인정보 관리"
            color={activeButton === 3 ? 'tertiary' : 'dark-gray'}
            onClick={() => navigate('/edit-profile')}
            className={S.customButton} // className 추가
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
