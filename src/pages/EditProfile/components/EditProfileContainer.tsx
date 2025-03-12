import { supabase } from '@/lib/SupabaseClient';
import { useEffect, useState } from 'react';
import EditProfile from '@/components/EditProfile/EditProfile';
import MyPageDiary from '@/components/MyPageDiary/MyPageDiary';

interface ProfileState {
  userId: string;
  nickname: string;
  email: string;
  profileImage: string;
}

function EditProfileContainer() {
  const [profile, setProfile] = useState<ProfileState | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // 🔹 유저 프로필 가져오기
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data: authData, error: authError } =
        await supabase.auth.getUser();
      if (authError || !authData.user) {
        console.error('유저 정보 가져오기 실패:', authError?.message);
        setLoading(false);
        return;
      }

      const userEmail = authData.user.email ?? ''; // undefined 방지
      console.log('현재 로그인된 유저 이메일:', userEmail);

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', userEmail)
        .single();

      if (error || !data) {
        console.error('유저 데이터 가져오기 실패:', error?.message);
        setLoading(false);
        return;
      }

      // 🔹 프로필 이미지 가져오기
      const { data: imageData } = supabase.storage
        .from('profileImg/userProfile')
        .getPublicUrl(`${data.id}.png`);

      setProfile({
        ...data,
        profileImage: imageData?.publicUrl || '/dummy/dummy_profile.jpg',
      });

      setLoading(false);
    };

    fetchProfile();
  }, []);

  // 🔹 현재 비밀번호 확인 함수
  const handleCheckPassword = async (currentPassword: string) => {
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassword.trim()) {
      setPasswordError('현재 비밀번호를 입력해주세요.');
      return;
    }

    if (currentPassword.trim().length < 6) {
      setPasswordError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: profile?.email ?? '',
        password: currentPassword,
      });

      if (error) {
        setPasswordError('현재 비밀번호가 일치하지 않습니다.');
        setIsPasswordVerified(false);
      } else {
        setPasswordSuccess('새 비밀번호를 입력해주세요!');
        setIsPasswordVerified(true);
      }
    } catch (err) {
      setPasswordError('비밀번호 확인 중 오류가 발생했습니다.');
    }
  };

  // 🔹 새 비밀번호 입력 가능 상태 감지
  useEffect(() => {
    if (isPasswordVerified) {
      console.log('🔓 새 비밀번호 입력 가능');
    }
  }, [isPasswordVerified]);

  // 🔹 프로필 업데이트 함수
  const handleProfileUpdate = async (
    updatedProfile: ProfileState,
    newPassword?: string,
    confirmNewPassword?: string
  ) => {
    if (!profile) return;

    setLoading(true);
    setPasswordError('');
    setPasswordSuccess('');

    // 🔹 공백 방지 및 유효성 검사
    const trimmedNickname = updatedProfile.nickname.trim();
    const trimmedEmail = updatedProfile.email.trim();

    if (!trimmedNickname) {
      setPasswordError('닉네임은 공백만 입력할 수 없습니다.');
      setLoading(false);
      return;
    }
    if (!trimmedEmail) {
      setPasswordError('이메일은 공백만 입력할 수 없습니다.');
      setLoading(false);
      return;
    }

    // 🔹 비밀번호 변경 처리
    if (newPassword && confirmNewPassword) {
      const trimmedNewPassword = newPassword.trim();
      const trimmedConfirmNewPassword = confirmNewPassword.trim();

      if (!isPasswordVerified) {
        setPasswordError('현재 비밀번호를 먼저 확인해주세요.');
        setLoading(false);
        return;
      }
      if (!trimmedNewPassword || !trimmedConfirmNewPassword) {
        setPasswordError('비밀번호는 공백만 입력할 수 없습니다.');
        setLoading(false);
        return;
      }
      if (trimmedNewPassword !== trimmedConfirmNewPassword) {
        setPasswordError('새 비밀번호가 일치하지 않습니다.');
        setLoading(false);
        return;
      }
      if (trimmedNewPassword.length < 6) {
        setPasswordError('비밀번호는 최소 6자 이상이어야 합니다.');
        setLoading(false);
        return;
      }

      const { error: passwordError } = await supabase.auth.updateUser({
        password: trimmedNewPassword,
      });

      if (passwordError) {
        setPasswordError('비밀번호 변경에 실패했습니다.');
        setLoading(false);
        return;
      }
      setPasswordSuccess('비밀번호가 성공적으로 변경되었습니다.');
    }

    // 🔹 닉네임 & 이메일 업데이트
    const { error: updateError } = await supabase
      .from('users')
      .update({
        nickname: trimmedNickname,
        email: trimmedEmail,
      })
      .eq('user_id', profile.userId);

    if (updateError) {
      console.error('프로필 업데이트 실패:', updateError.message);
    } else {
      setProfile({
        ...updatedProfile,
        nickname: trimmedNickname,
        email: trimmedEmail,
      });
      setPasswordSuccess('프로필이 수정되었습니다!');
    }
    setLoading(false);
  };

  if (loading) return <p>로딩 중...</p>;
  if (!profile) return <p>프로필 정보를 가져올 수 없습니다.</p>;

  return (
    <div>
      <MyPageDiary title="M Y P A G E">
        <EditProfile
          profile={profile}
          onSubmit={handleProfileUpdate}
          onCheckPassword={handleCheckPassword}
          isPasswordVerified={isPasswordVerified}
          passwordError={passwordError}
          passwordSuccess={passwordSuccess}
        />
      </MyPageDiary>
    </div>
  );
}

export default EditProfileContainer;
