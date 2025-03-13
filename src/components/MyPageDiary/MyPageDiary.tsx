import { useNavigate, useLocation } from 'react-router';
import Button from '../Button/Button';
import S from './MyPageDiary.module.css';
import React from 'react';

interface MyPageDiaryProps {
  children: React.ReactNode;
  title?: string;
}

function MyPageDiary({ children, title = '' }: MyPageDiaryProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 pathname을 활용하여 버튼 색상 조정
  const pathname = location.pathname;

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
        {/* 라우터를 활용한 버튼 */}
        <div className={S.myPageButtonContainer}>
          <button
            className={S.myPageRouterBtn}
            onClick={() => navigate('/bookmark')}
          >
            <Button
              label="Bookmark"
              style={{ width: '80%' }}
              color={pathname.includes('library') ? 'secondary' : 'dark-gray'}
            />
          </button>
          <button
            className={S.myPageRouterBtn}
            onClick={() => navigate('/calendar')}
          >
            <Button
              label="Calendar"
              style={{ width: '80%' }}
              color={pathname.includes('Reward') ? 'secondary' : 'dark-gray'}
            />
          </button>
          <button
            className={S.myPageRouterBtn}
            onClick={() => navigate('/edit-profile')}
          >
            <Button
              label="개인정보 관리"
              style={{ width: '80%' }}
              color={
                pathname.includes('edit-profile') ? 'secondary' : 'dark-gray'
              }
            />
          </button>
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
