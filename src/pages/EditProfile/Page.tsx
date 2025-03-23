import PasswordVerification from './components/PasswordVerification';
import EditProfile from '@/components/EditProfile/EditProfile';
import MyPageDiary from '@/components/MyPageDiary/MyPageDiary';
import withReactContent from 'sweetalert2-react-content';
import { supabase } from '@/lib/SupabaseClient';
import useLoginStore from '@/lib/LoginState';
import useDebounce from '@/lib/useDebounce';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

interface ProfileState {
  user_id: string;
  email: string;
  nickname: string;
  uid?: string;
  password?: string;
  alarm?: string | null;
  status?: string | null;
}
// 탈퇴 함수의 타입 정의
interface DeactivateAccountProps {
  onDeactivate: () => void;
}

type DeleteUserResult = {
  success: boolean;
  message?: string;
};

function EditProfilePage() {
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
  // 닉네임 입력 시 디바운스 적용
  const debouncedNickname = useDebounce(profile?.nickname ?? '', 500);
  // 알람 시간 상태 추가
  const [alarmTime, setAlarmTime] = useState<string | null>(null);
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);

  // 프로필 데이터가 바뀌면 알람 시간도 업데이트
  useEffect(() => {
    if (profile?.alarm) {
      setAlarmTime(profile.alarm);
    }
  }, [profile?.alarm]);

  // 로그아웃 기능: Supabase 세션을 종료하고, 로컬 스토리지에서 사용자 정보를 삭제한 후 메인 페이지로 이동

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

          // supabase에서 가져온 `alarm` 값이 `null`이면 `disabled`
          setAlarmTime(data.alarm ?? null);
          setIsAlarmEnabled(data.alarm !== null);
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

  // 알람 토글 핸들러
  const handleAlarmToggle = () => {
    setIsAlarmEnabled((prev) => {
      const newEnabled = !prev;
      if (!newEnabled) setAlarmTime(null);
      return newEnabled;
    });
  };

  // 알람 시간 변경 핸들러
  const handleAlarmTimeChange = (time: string) => {
    setAlarmTime(time);
  };

  // handleLogout 함수 추가
  const handleLogout = async () => {
    const resetUser = useLoginStore.getState().resetUser; // Zustand에서 `resetUser()` 가져오기

    await supabase.auth.signOut(); // Supabase 세션 종료
    localStorage.removeItem('userInfo'); // 로컬스토리지 삭제
    sessionStorage.clear(); // 세션 스토리지 삭제
    resetUser(); // zustand 상태 초기화
    window.location.href = '/'; // 새로고침 + 홈으로 이동
  };
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

  // 탈퇴 함수
  const customSwal = withReactContent(Swal);

  const handleDeactivateAccount: DeactivateAccountProps['onDeactivate'] =
    async () => {
      const result = await customSwal.fire({
        title: (
          <>
            <p style={{ marginBlock: '16px' }}>정말 탈퇴하시겠습니까?</p>
            <img src="/images/jellyfish_cry.png" alt="탈퇴 확인" />
          </>
        ),
        icon: 'warning',
        confirmButtonText: 'YES',
        showCancelButton: true,
        cancelButtonText: 'NO',
        customClass: {
          confirmButton: 'confirmButton',
          cancelButton: 'cancelButton',
          title: 'alertTitle',
        },
      });

      if (!result.isConfirmed) return;

      try {
        // 세션에서 토큰 + 유저 정보 가져오기
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();
        if (sessionError || !sessionData.session) throw new Error('세션 없음');

        const accessToken = sessionData.session.access_token;
        const userId = sessionData.session.user.id;

        // Edge Function 호출
        const response = await fetch(
          'https://vlaqppdfcbvhxtaqngam.functions.supabase.co/delete-user',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ userId }),
          }
        );
        console.log({ userId });

        const result: DeleteUserResult = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message ?? '탈퇴 실패');
        }

        // 상태 초기화 + 알림 + 로그아웃
        await customSwal.fire({
          title: (
            <>
              <p style={{ marginBlock: '16px' }}>이용해주셔서 감사합니다</p>
              <img src="/images/jellyfish.png" alt="탈퇴 완료 이미지" />
            </>
          ),
          confirmButtonText: '확인',
          customClass: { confirmButton: 'confirmButton' },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });

        await handleLogout();
      } catch (error) {
        console.error('탈퇴 실패:', error);
        await Swal.fire({
          title: '탈퇴 실패',
          text:
            error instanceof Error ? error.message : '탈퇴 처리 중 오류 발생',
          icon: 'error',
        });
      }
    };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!profile || !initialProfile) return;
      const updates: Partial<ProfileState> = {};
      let hasChanges = false;

      // 닉네임 변경 감지
      if (initialProfile.nickname.trim() !== profile.nickname.trim()) {
        updates.nickname = profile.nickname.trim();
        hasChanges = true;
      }

      // 알람 변경 감지 (null 값 허용)
      if (initialProfile.alarm !== alarmTime) {
        updates.alarm = alarmTime ?? null; // null 값도 저장되도록 보장
        hasChanges = true;
      }

      // 비밀번호 변경 감지
      let isPasswordUpdated = false;
      if (newPassword || confirmNewPassword) {
        isPasswordUpdated = await handlePasswordChange();
      }

      if (hasChanges) {
        await supabase
          .from('users')
          .update(updates)
          .eq('user_id', profile.user_id);

        // Supabase에서 alarm이 null일 경우에도 유지되도록 설정
        setProfile((prev) =>
          prev ? { ...prev, ...updates, alarm: updates.alarm ?? null } : prev
        );
        setInitialProfile((prev) =>
          prev ? { ...prev, ...updates, alarm: updates.alarm ?? null } : prev
        );
        setIsAlarmEnabled(updates.alarm !== null);
        setAlarmTime(updates.alarm ?? null);

        // 알람 설정 변경 메시지 추가
        if (updates.alarm !== undefined) {
          toast.success(
            updates.alarm ? '알람이 설정되었습니다.' : '알람이 해제되었습니다.'
          );
        }
        if (updates.nickname) {
          toast.success('닉네임이 변경되었습니다.');
        }
      }

      // 비밀번호 변경 성공 시 핫토스트 출력
      if (isPasswordUpdated) {
        toast.success('비밀번호가 성공적으로 변경되었습니다.');
      }

      if (hasChanges || isPasswordUpdated) {
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error('변경된 내용이 없습니다.');
      }
    } catch (error) {
      console.error('프로필 수정 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>로딩 중... 🚀</p>;

  return (
    <div>
      <title>Quzelly | 개인정보관리</title>
      <Toaster position="bottom-right" reverseOrder={false} />
      <MyPageDiary title="P r o f i l e">
        {!isPasswordVerified ? (
          <PasswordVerification
            onVerify={handlePasswordVerification} // 현재 비밀번호 검증 함수
            passwordError={errors.password}
          />
        ) : (
          <EditProfile
            profile={profile!}
            alarmTime={alarmTime}
            nicknameError={errors.nickname}
            onAlarmTimeChange={handleAlarmTimeChange}
            confirmPasswordError={errors.confirmPassword}
            confirmPasswordSuccess={''}
            confirmNewPassword={confirmNewPassword}
            passwordError={errors.password}
            passwordSuccess={''}
            newPassword={newPassword}
            onInputChange={handleInputChange}
            onSaveChanges={handleSaveChanges}
            onDeleteAccount={handleDeactivateAccount}
            isAlarmEnabled={isAlarmEnabled}
            onAlarmToggle={handleAlarmToggle}
          />
        )}
      </MyPageDiary>
    </div>
  );
}

export default EditProfilePage;
