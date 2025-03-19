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
  const passwordRegEx = useMemo(
    () => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,16}$/,
    []
  );
  const idRegEx = useMemo(() => /^[a-z0-9]+$/, []);
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

  const idValidate = useCallback(() => {
    const isValid = idRegEx.test(formData.id);
    setErrors((prev) => ({
      ...prev,
      id: isValid ? '' : 'ID는 영어와 숫자만 포함해야 합니다.',
    }));
    return isValid;
  }, [formData.id, idRegEx]);
  const handleIdCheck = useCallback(async () => {
    const id = formData.id.trim();
    if (!id) return setIsIdAvailable(false);
    if (!idValidate()) {
      setIsIdAvailable(false);
      return toast.error('ID는 영어와 숫자만 포함해야 합니다.');
    }

    setIdCheckLoading(true);
    const available = await idCheckAvailability(formData.id);
    setIsIdAvailable(available);
    setIdCheckLoading(false);

    if (available) {
      toast.success('사용가능한 ID입니다.');
    } else {
      toast.error('이미 사용중인 ID입니다.');
    }
  }, [formData.id, idValidate]);

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

  const passwordValidate = useCallback(() => {
    const isValid = passwordRegEx.test(formData.password);
    setErrors((prev) => ({
      ...prev,
      password: isValid ? '' : '비밀번호는 대소문자, 숫자를 포함해야합니다.',
    }));
    return isValid;
  }, [formData.password, passwordRegEx]);

  const passwordConfirmValidate = useCallback(() => {
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
  }, [formData.password, formData.passwordConfirm, errors.passwordConfirm]);

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
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.id, handleIdCheck]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.email) handleEmailCheck();
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.email, handleEmailCheck]);

  useEffect(() => {
    passwordValidate();
    passwordConfirmValidate();
  }, [
    formData.password,
    formData.passwordConfirm,
    passwordValidate,
    passwordConfirmValidate,
  ]);

  return (
    <div className={S.container}>
      <form onSubmit={handleSubmit} className={S.signUpForm}>
        <h1 className={S.title}>회원가입</h1>
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
          {errors.id && (
            <p style={{ color: 'red' }} aria-live="assertive" role="alert">
              {errors.id}
            </p>
          )}
          {idCheckLoading && <p>중복 확인 중....</p>}
          {isIdAvailable === null && (
            <p>아이디 중복 여부를 확인해주세요.</p>
          )}{' '}
          {isIdAvailable === false && (
            <p style={{ color: 'red' }} aria-live="polite">
              이미 사용중인 ID입니다.
            </p>
          )}
          {isIdAvailable === true && (
            <p style={{ color: 'green' }} aria-live="polite">
              사용 가능한 ID입니다.
            </p>
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
          {errors.email && (
            <p style={{ color: 'red' }} aria-live="assertive" role="alert">
              {errors.email}
            </p>
          )}
          {emailCheckLoading && <p>중복 확인 중....</p>}
          {isEmailAvailable === null && (
            <p>이메일 중복 여부를 확인해주세요.</p>
          )}{' '}
          {isEmailAvailable === false && (
            <p style={{ color: 'red' }} aria-live="polite">
              이미 사용중인 EMAIL입니다.
            </p>
          )}
          {isEmailAvailable === true && (
            <p style={{ color: 'green' }} aria-live="polite">
              사용 가능한 EMAIL입니다.
            </p>
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
        {errors.password && (
          <p style={{ color: 'red' }} aria-live="assertive" role="alert">
            {errors.password}
          </p>
        )}
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
          <p style={{ color: 'red' }} aria-live="assertive" role="alert">
            {errors.passwordConfirm}
          </p>
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

        <fieldset>
          <label htmlFor="allChecked" className={S.termsContainer}>
            <IoCheckmark
              size={20}
              className={`${S.radioIcon} ${allChecked ? S.checked : ''}`}
            />
            <legend>전체 동의합니다.</legend>
          </label>
          <input
            type="checkbox"
            id="allChecked"
            checked={allChecked}
            onChange={handleAllCheckedChange}
            className={S.checkboxInput}
          />
          <p className={S.subTitle}>
            선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할
            수 있습니다.
          </p>

          <label htmlFor="termsOfService" className={S.termsContainer}>
            <IoCheckmark
              size={20}
              className={`${S.radioIcon} ${formData.termsOfService ? S.checked : ''}`}
            />
            이용약관 동의(필수)
            <input
              type="checkbox"
              id="termsOfService"
              checked={formData.termsOfService}
              onClick={() => handleCheckChange('termsOfService')}
              className={S.checkboxInput}
            />
          </label>

          <label htmlFor="privacyPolicy" className={S.termsContainer}>
            <IoCheckmark
              size={20}
              className={`${S.radioIcon} ${formData.privacyPolicy ? S.checked : ''}`}
            />
            개인정보 수집 이용 동의(필수)
            <input
              type="checkbox"
              id="privacyPolicy"
              checked={formData.privacyPolicy}
              onClick={() => handleCheckChange('privacyPolicy')}
              className={S.checkboxInput}
            />
          </label>

          <label htmlFor="ageConfirmation" className={S.termsContainer}>
            <IoCheckmark
              size={20}
              className={`${S.radioIcon} ${formData.ageConfirmation ? S.checked : ''}`}
            />
            본인은 만 14세 이상입니다.(선택)
            <input
              type="checkbox"
              id="ageConfirmation"
              checked={formData.ageConfirmation}
              onClick={() => handleCheckChange('ageConfirmation')}
              className={S.checkboxInput}
            />
          </label>
        </fieldset>

        <Button
          type="submit"
          disabled={isSubmitting}
          label="회원가입"
          className={S.submitButton}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? '회원가입 중...' : '회원가입'}
        </Button>
        {isSubmitting && (
          <p style={{ color: 'red' }} aria-live="assertive">
            {isSubmitting}
          </p>
        )}
        {success && (
          <p style={{ color: 'green' }} aria-live="assertive">
            {success}
          </p>
        )}
      </form>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default SignUpPage;
