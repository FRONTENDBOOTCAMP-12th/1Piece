import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { supabase } from '@/lib/SupabaseClient';
import { IoCheckmark } from 'react-icons/io5';
import { useNavigate } from 'react-router';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import S from './Page.module.css';
import Swal from 'sweetalert2';

function SignUpPage() {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    email: '',
    users: '',
    termsOfService: false,
    privacyPolicy: false,
    ageConfirmation: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    email: '',
    users: '',
    termsOfService: '',
    privacyPolicy: '',
    ageConfirmation: '',
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
  const allChecked = useMemo(
    () =>
      formData.termsOfService &&
      formData.privacyPolicy &&
      formData.ageConfirmation,
    [formData]
  );

  const handleAllCheckedChange = () => {
    const newState = !allChecked;
    setFormData((prev) => ({
      ...prev,
      termsOfService: newState,
      privacyPolicy: newState,
      ageConfirmation: newState,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };

      if (
        name === 'termsOfService' ||
        name === 'privacyPolicy' ||
        name === 'ageConfirmation'
      ) {
        const allChecked =
          updatedData.termsOfService &&
          updatedData.privacyPolicy &&
          updatedData.ageConfirmation;
        setFormData((prevData) => ({
          ...prevData,
          allChecked,
        }));
      }

      return updatedData;
    });
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

  const handleCheckChange = (name: keyof typeof formData) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: !prevData[name],
    }));
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
      if (!errors.password) toast.error(errorMessage);
    }

    setErrors({ ...errors, password: errorMessage });
    return !errorMessage;
  };

  const passwordConfirmValidate = () => {
    const isMatch = formData.password === formData.passwordConfirm;
    const errorMessage = isMatch ? '' : '비밀번호가 일치하지 않습니다.';

    if (errorMessage && !errors.passwordConfirm) {
      toast.error(errorMessage);
    }

    setErrors((prev) => ({
      ...prev,
      passwordConfirm: errorMessage,
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
      termsOfService: '',
      privacyPolicy: '',
      ageConfirmation: '',
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

    if (!formData.email.trim()) {
      setErrors({ ...errors, email: 'EMAIL를 입력해주세요.' });
      toast.error('EMAIL를 입력해주세요.');
      return;
    }

    if (!formData.termsOfService || !formData.privacyPolicy) {
      toast.error('필수 약관에 동의해주세요.');
      setErrors({
        ...errors,
        termsOfService: '필수 약관에 동의해주세요',
        privacyPolicy: '필수 약관에 동의해주세요',
      });
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
        toast.error('사용자 저장에 실패했습니다.');
      } else {
        await Swal.fire({
          icon: 'success',
          title: '회원가입 성공!',
          text: '로그인 페이지로 이동합니다.',
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

        <div className={S.termsContainer}>
          <label htmlFor="allChecked" className={S.checkboxLabel}>
            <IoCheckmark
              size={20}
              className={`${S.radioIcon} ${allChecked ? S.checked : ''}`}
              onClick={handleAllCheckedChange}
            />
            전체 동의합니다.
          </label>
          <p className={S.subTitle}>
            선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할
            수 있습니다.
          </p>
        </div>

        <div className={S.termsContainer}>
          <label htmlFor="allChecked" className={S.checkboxLabel}>
            <IoCheckmark
              size={20}
              className={`${S.radioIcon} ${formData.termsOfService ? S.checked : ''}`}
              onClick={() => handleCheckChange('termsOfService')}
            />
            이용약관 동의(필수)
          </label>
        </div>

        <div className={S.termsContainer}>
          <label htmlFor="allChecked" className={S.checkboxLabel}>
            <IoCheckmark
              size={20}
              className={`${S.radioIcon} ${formData.privacyPolicy ? S.checked : ''}`}
              onClick={() => handleCheckChange('privacyPolicy')}
            />
            개인정보 수집 이용 동의(필수)
          </label>
        </div>

        <div className={S.termsContainer}>
          <label htmlFor="allChecked" className={S.checkboxLabel}>
            <IoCheckmark
              size={20}
              className={`${S.radioIcon} ${formData.ageConfirmation ? S.checked : ''}`}
              onClick={() => handleCheckChange('ageConfirmation')}
            />
            본인은 만 14세 이상입니다.(선택)
          </label>
        </div>

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
      <Toaster position="bottom-right" />
    </div>
  );
}

export default SignUpPage;
