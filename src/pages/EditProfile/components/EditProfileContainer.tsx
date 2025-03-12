import { supabase } from '@/lib/SupabaseClient';
import { useEffect, useState } from 'react';
import EditProfile from '@/components/EditProfile/EditProfile';
import MyPageDiary from '@/components/MyPageDiary/MyPageDiary';

interface ProfileState {
  user_id: string;
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
  const [nicknameError, setNicknameError] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // 유저 프로필 가져오기
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError || !authData.user) {
        setPasswordError('로그인 정보를 불러올 수 없습니다.');
        setLoading(false);
        return;
      }

      const userEmail = authData.user.email ?? '';

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', userEmail)
        .single();

      if (error || !data) {
        setPasswordError('유저 정보를 가져오는 중 오류 발생.');
        setLoading(false);
        return;
      }

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

  // 현재 비밀번호 확인 함수
  const handleCheckPassword = async (password?: string) => {
    const trimmedPassword = (password ?? '').trim();

    if (!trimmedPassword) {
      setPasswordError('현재 비밀번호를 입력해주세요.');
      return;
    }
    if (trimmedPassword.length < 6) {
      setPasswordError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: profile?.email ?? '',
        password: trimmedPassword,
      });

      if (error) {
        setPasswordError('현재 비밀번호가 일치하지 않습니다.');
        setIsPasswordVerified(false);
      } else {
        setPasswordError('');
        setIsPasswordVerified(true);
      }
    } catch (err) {
      setPasswordError('비밀번호 확인 중 오류가 발생했습니다.');
    }
  };

  // 입력값 검증 (닉네임 & 비밀번호)
  useEffect(() => {
    setPasswordSuccess('');
    setNicknameError('');

    const isInvalidInput = (str: string) =>
      !str ||
      str.trim() === '' ||
      /\s/.test(str) ||
      /^[a-zA-Z0-9]+$/.test(str) === false;

    // 비밀번호 검증
    if (isInvalidInput(newPassword) || isInvalidInput(confirmNewPassword)) {
      setPasswordError('비밀번호는 공백 없이 영문/숫자로만 입력해야 합니다.');
    } else if (newPassword.length < 6) {
      setPasswordError('비밀번호는 최소 6자 이상이어야 합니다.');
    } else if (newPassword !== confirmNewPassword) {
      setPasswordError('새 비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError('');
    }

    // 닉네임 검증
    if (isInvalidInput(profile?.nickname ?? '')) {
      setNicknameError('닉네임은 공백 없이 입력해야 합니다.');
    }
  }, [newPassword, confirmNewPassword, profile?.nickname]);

  // 프로필 업데이트 함수
  const handleProfileUpdate = async () => {
    setLoading(true);
    setPasswordSuccess('');

    if (!profile) {
      setPasswordError('프로필 정보를 불러오지 못했습니다.');
      setLoading(false);
      return;
    }

    const trimmedNickname = profile.nickname.trim();
    const trimmedEmail = profile.email.trim();

    if (!trimmedNickname || !trimmedEmail) {
      setPasswordError('닉네임과 이메일을 입력해주세요.');
      setLoading(false);
      return;
    }

    if (newPassword.trim() && confirmNewPassword.trim()) {
      if (!isPasswordVerified) {
        setPasswordError('현재 비밀번호를 먼저 확인해주세요.');
        setLoading(false);
        return;
      }

      if (newPassword.length < 6 || newPassword !== confirmNewPassword) {
        setPasswordError('새 비밀번호를 확인해주세요.');
        setLoading(false);
        return;
      }

      const { error: passwordError } = await supabase.auth.updateUser({
        password: newPassword.trim(),
      });

      if (passwordError) {
        alert('비밀번호 변경에 실패했습니다.🥲');
        setPasswordError('비밀번호 변경에 실패했습니다.');
        setLoading(false);
        return;
      } else {
        alert('비밀번호가 성공적으로 변경되었습니다.🎉');
        setPasswordSuccess('비밀번호가 성공적으로 변경되었습니다.');
        setLoading(true);

        setTimeout(() => {
          window.location.reload();
        }, 1500); // 1.5초 후 새로고침
      }
    }

    const { error: updateError } = await supabase
      .from('users')
      .update({ nickname: trimmedNickname, email: trimmedEmail })
      .eq('user_id', profile.user_id);

    if (updateError) {
      alert('프로필 업데이트에 실패했습니다.🥲');
      setPasswordError('');
    } else {
      setProfile({
        ...profile,
        nickname: trimmedNickname,
        email: trimmedEmail,
      });

      alert('프로필이 수정되었습니다.🎉');
    }

    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'currentPassword') setCurrentPassword(value);
    else if (name === 'newPassword') setNewPassword(value);
    else if (name === 'confirmNewPassword') setConfirmNewPassword(value);
    else setProfile((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  if (loading) return <p>로딩 중...</p>;
  if (!profile) return <p>프로필 정보를 가져올 수 없습니다.</p>;

  return (
    <div>
      <MyPageDiary title="M Y P A G E">
        <EditProfile
          profile={profile}
          currentPassword={currentPassword}
          newPassword={newPassword}
          confirmNewPassword={confirmNewPassword}
          onInputChange={handleInputChange}
          onSubmit={handleProfileUpdate}
          onCheckPassword={handleCheckPassword}
          isPasswordVerified={isPasswordVerified}
          passwordError={passwordError}
          passwordSuccess={passwordSuccess}
          nicknameError={nicknameError}
        />
      </MyPageDiary>
    </div>
  );
}

export default EditProfileContainer;
