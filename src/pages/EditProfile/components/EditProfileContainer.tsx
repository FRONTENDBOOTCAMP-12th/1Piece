import { supabase } from '@/lib/SupabaseClient';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import EditProfile from '@/components/EditProfile/EditProfile';
import MyPageDiary from '@/components/MyPageDiary/MyPageDiary';
import PasswordVerification from './PasswordVerification';

interface ProfileState {
  user_id: string;
  nickname: string;
  email: string;
  uid?: string;
  password?: string;
  alarm?: string | null;
}

const useDebouncedValue = (value: string, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

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

  const debouncedNickname = useDebouncedValue(profile?.nickname ?? '', 500);
  const [time, setTime] = useState(() =>
    dayjs(`2025-01-01T${profile?.alarm ?? '12:00'}`)
  );

  // 실제로 time을 사용
  useEffect(() => {
    console.log('설정된 알람 시간:', time.format('HH:mm'));
  }, [time]);

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

        if (error) {
          toast.error('프로필 데이터를 가져오는 중 오류가 발생했습니다.', {
            position: 'bottom-right',
          });
          return;
        }

        if (data) {
          console.log('가져온 프로필 데이터:', data);
          setProfile(data);
          setInitialProfile(data); // 원본 데이터 저장
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
    if (profile?.alarm) {
      setTime(dayjs(`2025-01-01T${profile.alarm}`));
    }
  }, [profile?.alarm]);

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
    if (!profile) return; // 프로필이 없으면 실행 X
    if (profile.alarm === newTime && (profile.alarm !== null) === checked)
      return; // 중복 호출 방지

    try {
      const { error } = await supabase
        .from('users')
        .update({ alarm: checked ? newTime : null }) // OFF 시 null 저장
        .eq('user_id', profile.user_id);

      if (error) throw error;

      setProfile((prev) =>
        prev ? { ...prev, alarm: checked ? newTime : null } : prev
      );

      toast.dismiss(); // 기존 알림 제거
      if (checked) {
        toast.success('알람이 설정되었습니다.', { position: 'bottom-right' });
      } else {
        toast.success('알람이 해제되었습니다.', { position: 'bottom-right' });
      }
    } catch (error) {
      console.error('알람 설정 실패:', error);
      toast.error(
        `알람 설정 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
        {
          position: 'bottom-right',
        }
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

      if (newPassword || confirmNewPassword) {
        isPasswordUpdated = await handlePasswordChange();
      }

      const updates: Partial<ProfileState> = {};
      let hasChanges = false;

      console.log('기존 닉네임:', initialProfile.nickname);
      console.log('입력된 닉네임:', debouncedNickname);

      const nicknameChanged =
        initialProfile.nickname.trim() !== debouncedNickname.trim() &&
        debouncedNickname.trim() !== '';

      console.log('닉네임 변경 감지:', nicknameChanged);

      if (nicknameChanged) {
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
    <MyPageDiary title="P r o f i l e">
      {!isPasswordVerified ? (
        <PasswordVerification
          onVerify={() => setIsPasswordVerified(true)}
          passwordError={errors.password}
        />
      ) : (
        <EditProfile
          profile={profile!}
          newPassword={newPassword}
          confirmNewPassword={confirmNewPassword}
          nicknameError={errors.nickname}
          passwordError={errors.password}
          confirmPasswordError={errors.confirmPassword}
          onInputChange={handleInputChange}
          onSaveChanges={handleSaveChanges}
          onSaveAlarm={handleSaveAlarm}
        />
      )}
    </MyPageDiary>
  );
}

export default EditProfileContainer;
