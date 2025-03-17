import { useEffect, useState } from 'react';
import { supabase } from '@/lib/SupabaseClient';
import EditProfile from '@/components/EditProfile/EditProfile';
import PasswordVerification from './PasswordVerification';
import MyPageDiary from '@/components/MyPageDiary/MyPageDiary';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

interface ProfileState {
  user_id: string;
  nickname: string;
  email: string;
  uid?: string;
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
  ); // 서버에서 가져온 원본 프로필

  const debouncedNickname = useDebouncedValue(profile?.nickname ?? '', 500);
  const debouncedEmail = useDebouncedValue(profile?.email ?? '', 500);

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
          throw new Error('프로필 데이터를 가져오는 중 오류가 발생했습니다.');
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
    if (!debouncedEmail.trim() || !profile) return;
    const checkEmail = async () => {
      const emailRegEx = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegEx.test(debouncedEmail)) {
        setErrors((prev) => ({
          ...prev,
          email: '이메일 주소가 유효하지 않습니다.',
        }));
        return;
      }

      const { data } = await supabase
        .from('users')
        .select('email')
        .eq('email', debouncedEmail)
        .neq('user_id', profile.user_id)
        .maybeSingle();
      setErrors((prev) => ({
        ...prev,
        email: data ? '이미 사용 중인 이메일입니다.' : '',
      }));
    };
    checkEmail();
  }, [debouncedEmail, profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = value.trim();

    if (name === 'newPassword') {
      setNewPassword(sanitizedValue);
      setErrors((prev) => ({
        ...prev,
        password:
          sanitizedValue.length < 8 || sanitizedValue.length > 16
            ? '비밀번호는 8자 이상 16자 이하로 입력해야 합니다.'
            : !/[A-Za-z]/.test(sanitizedValue)
              ? '비밀번호에는 최소 1개의 영문이 포함되어야 합니다.'
              : !/[0-9]/.test(sanitizedValue)
                ? '비밀번호에는 최소 1개의 숫자가 포함되어야 합니다.'
                : '',
      }));
    } else if (name === 'confirmNewPassword') {
      setConfirmNewPassword(sanitizedValue);
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          newPassword !== sanitizedValue ? '비밀번호가 일치하지 않습니다.' : '',
      }));
    } else {
      setProfile((prev) => (prev ? { ...prev, [name]: sanitizedValue } : prev));
    }
  };

  const handlePasswordChange = async () => {
    if (
      !newPassword ||
      newPassword.length < 8 ||
      newPassword.length > 16 ||
      !/[A-Za-z]/.test(newPassword) ||
      !/[0-9]/.test(newPassword) ||
      newPassword !== confirmNewPassword
    ) {
      setErrors((prev) => ({
        ...prev,
        password:
          newPassword.length < 8 || newPassword.length > 16
            ? '비밀번호는 8자 이상 16자 이하로 입력해야 합니다.'
            : !/[A-Za-z]/.test(newPassword)
              ? '비밀번호에는 최소 1개의 영문이 포함되어야 합니다.'
              : !/[0-9]/.test(newPassword)
                ? '비밀번호에는 최소 1개의 숫자가 포함되어야 합니다.'
                : '',
        confirmPassword:
          newPassword !== confirmNewPassword
            ? '비밀번호가 일치하지 않습니다.'
            : '',
      }));
      toast.error('비밀번호 조건을 확인해주세요.', {
        position: 'bottom-right',
      });
      return false;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw new Error('비밀번호 변경 실패');
      toast.success('비밀번호가 성공적으로 변경되었습니다. 🎉', {
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

      if (error) throw new Error('닉네임 & 이메일 업데이트 실패');

      console.log('닉네임 & 이메일이 성공적으로 업데이트되었습니다!');
      return true;
    } catch (error) {
      console.error(
        '닉네임 & 이메일 저장 중 오류 발생:',
        error instanceof Error ? error.message : '알 수 없는 오류 발생'
      );
      return false;
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

      if (initialProfile.email.trim() !== debouncedEmail.trim()) {
        updates.email = debouncedEmail.trim();
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
        console.log('프로필이 성공적으로 수정되었습니다!');
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

  if (loading) return <p>로딩 중...🚀</p>;

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
          emailError={errors.email}
          passwordError={errors.password}
          confirmPasswordError={errors.confirmPassword}
          onInputChange={handleInputChange}
          onSaveChanges={handleSaveChanges}
        />
      )}
    </MyPageDiary>
  );
}

export default EditProfileContainer;
