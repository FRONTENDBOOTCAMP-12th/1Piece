import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { supabase } from '@/lib/SupabaseClient';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import S from './Page.module.css';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';

function SignUpPage() {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    email: '',
    users: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    email: '',
    users: '',
  });
  const [success] = useState('');
  const [isIdAvailable, setIsIdAvailable] = useState<boolean | null>(null);
  const [idCheckLoading, setIdCheckLoading] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(
    null
  );
  const [emailCheckLoading, setEmailCheckLoading] = useState(false);

  const emailRegEx = useMemo(
    () =>
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/,
    []
  );
  const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,16}$/;
  const startIsSubmitting = () => setIsSubmitting(true);
  const stopIsSubmitting = () => setIsSubmitting(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'id') {
      setIsIdAvailable(null);
    }

    if (name === 'email') {
      setIsEmailAvailable(null);
      setErrors({ ...errors, email: '' });
    }

    if (name === 'password') {
      passwordValidate();
    }
  };

  const idCheckAvailability = async (id: string) => {
    if (!id.trim()) return false;

    try {
      const { data } = await supabase
        .from('users')
        .select('user_id')
        .eq('user_id', id.trim())
        .maybeSingle();
      return !data;
    } catch (error) {
      console.error('ID 중복 체크 오류:', error);
      return false;
    }
  };

  const emailCheckAvailability = async (email: string) => {
    if (!email.trim()) return false;

    try {
      const { data } = await supabase
        .from('users')
        .select('email')
        .eq('email', email.trim())
        .maybeSingle();
      return !data;
    } catch (error) {
      console.error('Email 중복 체크 오류:', error);
      return false;
    }
  };

  const handleIdCheck = useCallback(async () => {
    const id = formData.id.trim();
    if (!id) return setIsIdAvailable(false);

    setIdCheckLoading(true);
    const available = await idCheckAvailability(formData.id);
    setIsIdAvailable(available);
    setIdCheckLoading(false);

    if (available) {
      toast.success('사용가능한 ID입니다.');
    } else {
      toast.error('이미 사용중인 ID입니다.');
    }
  }, [formData.id]);

  const emailValidate = useCallback(() => {
    const isValid = emailRegEx.test(formData.email);
    setErrors((prev) => ({
      ...prev,
      email: isValid ? '' : '이메일 주소가 유효하지 않습니다.',
    }));
    return isValid;
  }, [formData.email, emailRegEx]);

  const handleEmailCheck = useCallback(async () => {
    const email = formData.email.trim();
    if (!email) return setIsEmailAvailable(false);

    if (!emailValidate()) return setIsEmailAvailable(null);

    setEmailCheckLoading(true);
    const available = await emailCheckAvailability(email);
    setIsEmailAvailable(available);
    setEmailCheckLoading(false);

    if (available) {
      toast.success('사용가능한 Email입니다.');
    } else {
      toast.error('이미 사용중인 Email입니다.');
    }
  }, [formData.email, emailValidate]);

  const passwordValidate = () => {
    const { password } = formData;
    let errorMessage = '';
    if (!passwordRegEx.test(password)) {
      errorMessage = '비밀번호는 대소문자, 숫자를 포함해야합니다.';
    }

    setErrors({ ...errors, password: errorMessage });
    return !errorMessage;
  };

  const passwordConfirmValidate = () => {
    const isMatch = formData.password === formData.passwordConfirm;
    setErrors((prev) => ({
      ...prev,
      passwordConfirm: isMatch ? '' : '비밀번호가 일치하지 않습니다.',
    }));
    return isMatch;
  };

  const handlePasswordConfirmBlur = () => {
    passwordConfirmValidate();
  };

  const clearErrors = () => {
    setErrors({
      id: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
      email: '',
      users: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();

    if (!formData.id.trim()) {
      setErrors({ ...errors, id: 'ID를 입력해주세요.' });
      toast.error('ID를 입력해주세요.');
      return;
    }

    if (!emailValidate()) return;

    if (!passwordValidate()) return;

    if (formData.password !== formData.passwordConfirm) {
      setErrors((prev) => ({
        ...prev,
        passwordConfirm: '비밀번호가 일치하지 않습니다.',
      }));
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!passwordConfirmValidate()) return;

    startIsSubmitting();

    try {
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

      if (signUpError) {
        toast.error(signUpError.message);
        return;
      }

      const user = signUpData?.user;

      if (!user) {
        toast.error('회원가입에 실패했습니다. 다시 시도해주세요.');
        return;
      }

      const { error: usersError } = await supabase.from('users').upsert({
        user_id: formData.id,
        email: formData.email,
        nickname: formData.nickname,
        auth_uid: user.id,
      });

      if (usersError) {
        console.error('사용자 테이블 삽입 실패:', usersError.message);
        toast.error('사용자 저장에 실패했습니다.');
      } else {
        await Swal.fire({
          icon: 'success',
          title: '회원가입 성공!',
          text: '이메일을 확인해주세요',
          confirmButtonText: '확인',
        });

        navigate('/login');
      }
    } catch {
      toast.error('회원가입 중 오류가 발생했습니다.');
    } finally {
      stopIsSubmitting();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.id) handleIdCheck();
      if (formData.email) handleEmailCheck();
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData.id, handleIdCheck, formData.email, handleEmailCheck]);

  return (
    <div className={S.container}>
      <form onSubmit={handleSubmit} className={S.signUpForm}>
        <h2 className={S.title}>회원가입</h2>
        <div>
          <Input
            label="ID"
            name="id"
            type="text"
            placeholder="ID를 입력하세요"
            value={formData.id}
            onChange={handleChange}
            onBlur={handleIdCheck}
            className={S.inputBox}
          />
          {idCheckLoading && <p>중복 확인 중....</p>}
          {isIdAvailable === null && (
            <p>아이디 중복 여부를 확인해주세요.</p>
          )}{' '}
          {/* null일 때만 메시지 안내 */}
          {isIdAvailable === false && (
            <p style={{ color: 'red' }}>이미 사용중인 ID입니다.</p>
          )}
          {isIdAvailable === true && (
            <p style={{ color: 'green' }}>사용 가능한 ID입니다.</p>
          )}
          <Input
            label="이메일"
            name="email"
            type="email"
            placeholder="Qzelly@gmail.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleEmailCheck}
            className={S.inputBox}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
          {emailCheckLoading && <p>중복 확인 중....</p>}
          {isEmailAvailable === null && (
            <p>이메일 중복 여부를 확인해주세요.</p>
          )}{' '}
          {isEmailAvailable === false && (
            <p style={{ color: 'red' }}>이미 사용중인 EMAIL입니다.</p>
          )}
          {isEmailAvailable === true && (
            <p style={{ color: 'green' }}>사용 가능한 EMAIL입니다.</p>
          )}
        </div>
        <Input
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={formData.password}
          onChange={handleChange}
          className={S.inputBox}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        <Input
          label="비밀번호확인"
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호를 한번 더 입력하세요"
          value={formData.passwordConfirm}
          onChange={handleChange}
          onBlur={handlePasswordConfirmBlur}
          className={S.inputBox}
        />
        {errors.passwordConfirm && (
          <p style={{ color: 'red' }}>{errors.passwordConfirm}</p>
        )}
        <Input
          label="닉네임"
          name="nickname"
          type="text"
          placeholder="닉네임을 입력해주세요"
          value={formData.nickname}
          onChange={handleChange}
          className={S.inputBox}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          label="회원가입"
          className={S.submitButton}
        >
          {isSubmitting ? '회원가입 중...' : '회원가입'}
        </Button>
        {isSubmitting && <p style={{ color: 'red' }}>{isSubmitting}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </div>
  );
}

export default SignUpPage;
