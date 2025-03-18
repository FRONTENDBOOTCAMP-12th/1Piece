import { useNavigate } from 'react-router';
import Button from '../Button/Button';
import S from './MyPageDiary.module.css';
import React from 'react';

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
    // 디자인을 위한 container
    <div className={S.diaryContainer}>
      {/* 다이어리의 왼쪽과 오른쪽의 디자인 구분 */}
      <div className={S.leftDiary}>
        {/* 이후 유저의 정보를 받아와야함 */}
        <p className={S.levelText}>LV.999 | 김멋사</p>
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
          />
          <Button
            label="출석과 보상"
            color={activeButton === 2 ? 'tertiary' : 'dark-gray'}
            onClick={() => navigate('/calendar')}
          />
          <Button
            label="개인정보 관리"
            color={activeButton === 3 ? 'tertiary' : 'dark-gray'}
            onClick={() => navigate('/edit-profile')}
          />
        </div>
      </div>
      <div className={S.rightDiary}>
        <h1 className={S.pageName}>{title}</h1>
        {children}
      </div>
      {/* 오른쪽과 왼쪽을 연결하는 스프링 디자인 */}
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
