import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { supabase } from '@/lib/SupabaseClient';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import S from './Page.module.css';
import useLoginStore from '@/lib/LoginState';
import useBookMarkStore from '@/lib/BookmarkState';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import useProfileStore from '@/lib/UserProfileState';
import useCalendarStore from '@/lib/CalendarState';

const getDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
};

getDate();

function LogInPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUserInfo } = useLoginStore();
  const { setBookmarks } = useBookMarkStore();
  const { setUserProfile, setProfileImg } = useProfileStore();
  const setDateList = useCalendarStore((state) => state.setDateList);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // users테이블에서 정보 받아오기
      const { data: users, error: userError } = await supabase
        .from('users')
        .select('email')
        .eq('user_id', id)
        .single();

      if (userError || !users) {
        toast.error('아이디가 존재하지 않습니다.');
        return;
      }

      const email = users.email ?? '';

      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError || !data.user || !data.session) {
        toast.error('이메일이나 비밀번호가 일치하지 않습니다.');
        return;
      }

      // 출석 정보 insert 혹은 update
      await supabase
        .from('attendance')
        .upsert(
          {
            attendance_date: getDate(),
            user_id: data.user.id,
          },
          {
            onConflict: 'attendance_date, user_id',
          }
        )
        .select();

      // 출석한 모든 일수 가져오기
      const { data: calendarData } = await supabase
        .from('attendance')
        .select('*')
        .eq('user_id', data.user.id);

      const newDateList = calendarData?.map((item) => {
        return item.attendance_date;
      });

      // level을 출석한 날짜를 바탕으로 업데이트
      await supabase
        .from('users')
        .update({ level: newDateList?.length })
        .eq('auth_uid', data.user.id);

      // users테이블에서 auth_uid가 같은 row가져오기
      const { data: profileData } = await supabase
        .from('users')
        .select('*')
        .eq('auth_uid', data.user.id);

      // 북마크한 항목 모두 가져오기
      const { data: bookmarkedData } = await supabase
        .from('bookmark')
        .select('*')
        .eq('bookmark_user', `${profileData![0].id}`);

      // 유저의 프로필 이미지 저장
      const { data: profileImg } =
        supabase.storage
          .from('profileImg/userProfile')
          .getPublicUrl(`${profileData![0].id}.png`) ??
        'dummy/dummy_profile.png';
      let newProfileImg = profileImg.publicUrl;
      try {
        const response = await fetch(profileImg.publicUrl, { method: 'HEAD' });

        if (!response.ok) {
          newProfileImg = 'dummy/dummy_profile.png';
        }
      } catch (error) {
        console.log(error);
      }

      // 초기 설정 모두 다
      setBookmarks(bookmarkedData!);
      setUserInfo(data.user ?? null);
      setUserProfile(profileData![0]);
      setProfileImg(newProfileImg);
      setDateList(newDateList!);

      await Swal.fire({
        icon: 'success',
        title: '로그인 성공!',
        text: '메인 페이지로 이동합니다.',
        confirmButtonText: '확인',
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      console.error(`로그인 오류:`, error);
      toast.error('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={S.container}>
      <title>Quzelly | 로그인</title>
      <meta name="description" content="Quzelly 로그인 페이지입니다" />
      <meta property="og:title" content="Quzelly" />
      <meta
        property="og:description"
        content="어디든 자유롭게! Quzelly에서 퀴즈를 풀고 탐험하세요."
      />
      <meta
        property="og:image"
        content="https://quzelly.vercel.app/images/main_banner.webp"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://quzelly.vercel.app/login" />
      <form onSubmit={handleLogin} className={S.loginForm}>
        <h1 className={S.title}>로그인</h1>
        <Input
          label="아이디"
          type="text"
          value={id}
          onChange={handleIdChange}
          className={S.loginInputBox}
        />
        <Input
          label="비밀번호"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className={S.loginInputBox}
        />
        <div className={S.findLink}>
          <NavLink to="/find-id" aria-label="아이디 찾기 페이지로 이동">
            아이디 찾기
          </NavLink>
          <span className={S.separator} aria-hidden="true">
            |
          </span>
          <NavLink
            to="/find-password"
            aria-label="비밀번호 재설정 페이지로 이동"
          >
            비밀번호 재설정
          </NavLink>
        </div>
        <div className={S.buttonContainer}>
          <Button
            type="submit"
            label="로그인"
            color={'primary-2'}
            className={S.submitButton}
          />
          <Button
            type="button"
            label="회원가입"
            color={'tertiary'}
            className={S.submitButton}
            onClick={() => navigate('/sign-up')}
          />
        </div>
      </form>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default LogInPage;
