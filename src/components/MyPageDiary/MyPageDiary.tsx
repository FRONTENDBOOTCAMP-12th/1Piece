import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import Button from '../Button/Button';
import { supabase } from '@/lib/SupabaseClient';
import { PostgrestError } from '@supabase/supabase-js';
import S from './MyPageDiary.module.css';

interface MyPageDiaryProps {
  children: React.ReactNode;
  title?: string;
  activeButton?: number;
}

interface UserData {
  nickname: string;
  level: number;
}

function MyPageDiary({
  children,
  title = '',
  activeButton = 1,
}: MyPageDiaryProps) {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<{
    nickname: string;
    level: number;
  } | null>(null);

  const fetchUserInfo = useCallback(async () => {
    try {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError || !sessionData.session) {
        console.error('로그인된 사용자가 없습니다.', sessionError);
        return;
      }

      const authUid = sessionData.session.user.id;

      const { data: userData, error: userError } = (await supabase
        .from('users')
        .select('nickname, level')
        .eq('auth_uid', authUid)
        .single()) as { data: UserData; error: PostgrestError | null };

      if (userError || !userData) {
        console.error('사용자 정보를 가져오는 데 실패했습니다.', userError);
        return;
      }

      setUserInfo({
        nickname: userData.nickname,
        level: userData.level,
      });
    } catch (error) {
      console.error('사용자 정보 조회 중 오류 발생:', error);
    }
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return (
    <div className={S.diaryContainer}>
      <div className={S.leftDiary}>
        <div className={S.userInfo}>
          <p className={S.level}>LV.{userInfo?.level ?? '999'} </p> |{' '}
          <p className={S.nickname}>{userInfo?.nickname ?? '김멋사'} </p>
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
