import { useEffect, useState } from 'react';
import { supabase } from '@/lib/SupabaseClient';
import S from './EditProfileContainer.module.css';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import useDebounce from '../../../lib/useDebounce';
import EditProfile from '@/components/EditProfile/EditProfile';
import MyPageDiary from '@/components/MyPageDiary/MyPageDiary';
import PasswordVerification from './PasswordVerification';
interface ProfileState {
  user_id: string;
  email: string;
  nickname: string;
  uid?: string;
  password?: string;
  alarm?: string | null;
}

function EditProfileContainer() {
  const [profile, setProfile] = useState<ProfileState | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
    nickname: '',
    email: '',
  });
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [initialProfile, setInitialProfile] = useState<ProfileState | null>(
    null
  );
  const [time, setTime] = useState(() =>
    dayjs(`2025-01-01T${profile?.alarm ?? '09:00'}`)
  );

  // 닉네임 입력 시 디바운스 적용
  const debouncedNickname = useDebounce(profile?.nickname ?? '', 500);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData.session) return;

        const userId = sessionData.session.user.id;
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('auth_uid', userId)
          .single();

        console.log('[Supabase] 업데이트 후 데이터:', data);

        if (error) {
          toast.error('프로필 데이터를 가져오는 중 오류가 발생했습니다.', {
            position: 'bottom-right',
          });
          return;
        }

        if (data) {
          console.log('가져온 프로필 데이터:', data);
          // 기존 데이터와 다를 때만 상태 업데이트
          setProfile((prev) =>
            JSON.stringify(prev) !== JSON.stringify(data) ? data : prev
          );
          setInitialProfile((prev) =>
            JSON.stringify(prev) !== JSON.stringify(data) ? data : prev
          );
        }
      } catch (error) {
        toast.error(
          `프로필 불러오기 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
          { position: 'bottom-right' }
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    // 닉네임 중복 검사
    if (!debouncedNickname.trim() || !profile?.user_id) return;
    const checkNickname = async () => {
      const { data } = await supabase
        .from('users')
        .select('nickname')
        .eq('nickname', debouncedNickname)
        .neq('user_id', profile.user_id)
        .maybeSingle();
      setErrors((prev) => ({
        ...prev,
        nickname: data ? '사용 중인 닉네임입니다.' : '',
      }));
    };
    checkNickname();
  }, [debouncedNickname, profile?.user_id]);

  useEffect(() => {
    console.log('설정된 알람 시간:', time.format('HH:mm'));
  }, [time]);

  useEffect(() => {
    if (profile?.alarm) {
      setTime(dayjs(`2025-01-01T${profile.alarm}`));
    }
  }, [profile?.alarm]); // profile?.alarm 변경 시 한 번만 실행

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = value.trim();

    if (name === 'newPassword') {
      setNewPassword(sanitizedValue);
      const passwordError = validatePassword(
        sanitizedValue,
        confirmNewPassword
      );

      setErrors((prev) => ({
        ...prev,
        password: passwordError.includes('비밀번호') ? passwordError : '',
        confirmPassword:
          sanitizedValue === confirmNewPassword
            ? ''
            : '비밀번호가 일치하지 않습니다.',
      }));
    } else if (name === 'confirmNewPassword') {
      setConfirmNewPassword(sanitizedValue);

      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          newPassword === sanitizedValue ? '' : '비밀번호가 일치하지 않습니다.',
        password: validatePassword(newPassword, sanitizedValue), // 새 비밀번호도 다시 검증
      }));
    } else {
      setProfile((prev) => (prev ? { ...prev, [name]: sanitizedValue } : prev));
    }
  };

  const validatePassword = (password: string, confirmPassword: string) => {
    if (!password) return '비밀번호를 입력하세요.';
    if (password.length < 8 || password.length > 16)
      return '비밀번호는 8자 이상 16자 이하로 입력해야 합니다.';
    if (!/[A-Za-z]/.test(password))
      return '비밀번호에는 최소 1개의 영문이 포함되어야 합니다.';
    if (!/[0-9]/.test(password))
      return '비밀번호에는 최소 1개의 숫자가 포함되어야 합니다.';
    if (password !== confirmPassword) return '비밀번호가 일치하지 않습니다.';
    return ''; // 에러가 없을 경우 빈 문자열 반환
  };

  // 비밀번호 검증 함수 추가
  const handlePasswordVerification = async (password: string) => {
    if (!profile?.email) {
      toast.error('이메일 정보를 불러올 수 없습니다.', {
        position: 'bottom-right',
      });
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: profile.email,
        password,
      });

      if (error) {
        setErrors((prev) => ({
          ...prev,
          password: '비밀번호가 일치하지 않습니다.',
        }));
        toast.error('비밀번호가 일치하지 않습니다.', {
          position: 'bottom-right',
        });
        return;
      }

      setIsPasswordVerified(true); //  인증 성공 시 개인정보관리 페이지로 이동
    } catch (error) {
      console.error('비밀번호 확인 중 오류 발생:', error);
      toast.error('비밀번호 확인 중 오류가 발생했습니다.', {
        position: 'bottom-right',
      });
    }
  };

  const handlePasswordChange = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      toast.error('로그인이 필요합니다.', { position: 'bottom-right' });
      return false;
    }

    if (!profile) {
      toast.error('프로필 정보를 불러오는 중 오류가 발생했습니다.', {
        position: 'bottom-right',
      });
      return false;
    }

    const passwordError = validatePassword(newPassword, confirmNewPassword);
    if (passwordError) {
      setErrors((prev) => ({
        ...prev,
        password: passwordError.includes('비밀번호') ? passwordError : '',
        confirmPassword: passwordError.includes('일치') ? passwordError : '',
      }));
      toast.error(passwordError, { position: 'bottom-right' });
      return false;
    }

    try {
      console.log('비밀번호 변경 요청 시작');
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.error('비밀번호 변경 실패:', error);

        // 새 비밀번호가 기존 비밀번호와 같을 경우 에러 메시지 표시
        if (
          error.message.includes(
            'New password should be different from the old password'
          )
        ) {
          setErrors((prev) => ({
            ...prev,
            password: '새 비밀번호는 기존 비밀번호와 달라야 합니다.',
          }));
          toast.error('새 비밀번호는 기존 비밀번호와 달라야 합니다.', {
            position: 'bottom-right',
          });
          return false;
        }

        throw new Error('비밀번호 변경 실패');
      }

      console.log('비밀번호 변경 성공:', data);
      setErrors({ password: '', confirmPassword: '', nickname: '', email: '' });

      toast.success('비밀번호가 성공적으로 변경되었습니다.', {
        position: 'bottom-right',
      });
      return true;
    } catch (error) {
      toast.error(
        `비밀번호 변경 실패: ${error instanceof Error ? error.message : String(error)}`,
        {
          position: 'bottom-right',
        }
      );
      return false;
    }
  };

  const handleProfileUpdate = async (updates: Partial<ProfileState>) => {
    if (!profile || Object.keys(updates).length === 0) return false;

    try {
      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('user_id', profile.user_id);

      if (error) throw new Error('닉네임 변경 실패');

      console.log('닉네임 변경되었습니다.');
      toast.success('닉네임이 변경되었습니다.', {
        position: 'bottom-right',
      });
      return true;
    } catch (error) {
      console.error(
        '닉네임 저장 중 오류 발생:',
        error instanceof Error ? error.message : '알 수 없는 오류 발생'
      );
      return false;
    }
  };

  const handleSaveAlarm = async (newTime: string | null, checked: boolean) => {
    if (!profile || !initialProfile) return;

    console.log(
      `[handleSaveAlarm] 실행됨: newTime=${newTime}, checked=${checked}`
    );

    // 기존 값과 동일하면 API 호출 방지
    if (
      initialProfile.alarm === newTime &&
      Boolean(initialProfile.alarm) === checked
    ) {
      console.log('[handleSaveAlarm] 변경된 값이 없으므로 API 호출 생략');
      return;
    }

    try {
      console.log(
        `[handleSaveAlarm] Supabase 업데이트 요청!: newTime=${newTime}, checked=${checked}`
      );

      const { error } = await supabase
        .from('users')
        .update({ alarm: checked ? newTime : null })
        .eq('user_id', profile.user_id);

      if (error) throw error;

      // 최신 상태 업데이트
      setProfile((prev) =>
        prev ? { ...prev, alarm: checked ? newTime : null } : prev
      );
      setInitialProfile((prev) =>
        prev ? { ...prev, alarm: checked ? newTime : null } : prev
      );

      console.log(
        `[handleSaveAlarm] 알람 업데이트 성공~: newTime=${newTime}, checked=${checked}`
      );

      toast.dismiss();
      toast.success(
        checked ? '알람이 설정되었습니다.' : '알람이 해제되었습니다.',
        {
          position: 'bottom-right',
        }
      );
    } catch (error) {
      console.error('[handleSaveAlarm] 알람 설정 실패:', error);
      toast.error(
        `알람 설정 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
        { position: 'bottom-right' }
      );
    }
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('handleSaveChanges 실행됨');
      console.log('profile 상태:', profile);
      console.log('initialProfile 상태:', initialProfile);

      if (!profile || !initialProfile) {
        console.error('profile이 설정되지 않음. 업데이트 불가');
        return;
      }

      let isPasswordUpdated = false;
      let isProfileUpdated = false;

      // 비밀번호가 변경된 경우에만 업데이트
      if (newPassword || confirmNewPassword) {
        isPasswordUpdated = await handlePasswordChange();
      }

      const updates: Partial<ProfileState> = {};
      let hasChanges = false;

      // 닉네임이 변경된 경우에만 업데이트
      if (
        initialProfile.nickname.trim() !== debouncedNickname.trim() &&
        debouncedNickname.trim() !== ''
      ) {
        updates.nickname = debouncedNickname.trim();
        hasChanges = true;
      }

      if (hasChanges) {
        isProfileUpdated = await handleProfileUpdate(updates);
        if (isProfileUpdated) {
          setProfile((prev) => (prev ? { ...prev, ...updates } : prev));
          setInitialProfile((prev) => (prev ? { ...prev, ...updates } : prev)); // 원본 데이터 업데이트
        }
      }

      if (isPasswordUpdated || isProfileUpdated) {
        console.log('프로필이 수정되었습니다.');
      } else {
        console.log('변경된 내용이 없습니다.');
        toast.error('변경된 내용이 없습니다.', { position: 'bottom-right' });
      }
    } catch (error) {
      console.error(
        '프로필 수정 실패:',
        error instanceof Error ? error.message : error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>로딩 중... 🚀</p>;

  return (
    <div className={S.MyPageContainer}>
      <MyPageDiary title="P r o f i l e">
        {!isPasswordVerified ? (
          <PasswordVerification
            onVerify={handlePasswordVerification} // 검증 함수 연결
            passwordError={errors.password}
          />
        ) : (
          <EditProfile
            profile={profile!}
            newPassword={newPassword}
            confirmNewPassword={confirmNewPassword}
            nicknameError={errors.nickname}
            passwordError={errors.password}
            passwordSuccess={''}
            confirmPasswordError={errors.confirmPassword}
            confirmPasswordSuccess={''}
            onInputChange={handleInputChange}
            onSaveChanges={handleSaveChanges}
            onSaveAlarm={handleSaveAlarm}
          />
        )}
      </MyPageDiary>
    </div>
  );
}

export default EditProfileContainer;
