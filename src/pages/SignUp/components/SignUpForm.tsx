import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { supabase } from '@/lib/SupabaseClient';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function SignUpForm() {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    email: '',
  });
  const formErrors = { ...errors };
  const [success, setSuccess] = useState('');
  const [isIdAvailable, setIsIdAvailable] = useState<boolean | null>(null);
  const [idCheckLoading, setIdCheckLoading] = useState(false);

  // const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  const startIsSubmitting = () => setIsSubmitting(true);
  const stopIsSubmitting = () => setIsSubmitting(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'id') {
      setIsIdAvailable(true);
    }
  };

  const idCheckAvailability = async (id: string) => {
    if (!id.trim()) return false;

    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('ID 중복 체크 오류:', error.message);
    }

    return !data;
  };

  const handleIdCheck = async () => {
    if (!formData.id.trim()) {
      setIsIdAvailable(false);
      return;
    }
    setIdCheckLoading(true);
    const available = await idCheckAvailability(formData.id);
    setIsIdAvailable(available);
    setIdCheckLoading(false);
  };

  const passwordValidate = () => {
    if (formData.password !== formData.passwordConfirm) {
      formErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
      setErrors({
        ...errors,
        passwordConfirm: '비밀번호가 일치하지 않습니다.',
      });
      return false;
    }
    return true;
  };

  const emailValidate = () => {
    if (!emailRegEx.test(formData.email)) {
      formErrors.email = '이메일 주소가 유효하지 않습니다.';
      setErrors({ ...errors, email: '이메일 주소가 유효하지 않습니다.' });
      return false;
    }
    return true;
  };

  const clearErrors = () => {
    setErrors({
      id: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
      email: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();

    if (!formData.id.trim()) {
      setErrors({ ...errors, id: 'ID를 입력해주세요.' });
      return;
    }

    if (!passwordValidate() || !emailValidate()) {
      return;
    }

    startIsSubmitting();

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setErrors({ ...errors, email: error.message, password: error.message });
      } else {
        setSuccess('회원가입에 성공했습니다.');
        navigate('/login');
      }
    } catch {
      setErrors({
        ...errors,
        id: '회원가입에 실패했습니다.',
        password: '회원가입에 실패했습니다.',
        passwordConfirm: '회원가입에 실패했습니다.',
        nickname: '회원가입에 실패했습니다.',
        email: '회원가입에 실패했습니다.',
      });
    } finally {
      stopIsSubmitting();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>회원가입</h2>
      <Input
        label="ID"
        name="id"
        type="text"
        placeholder="ID를 입력하세요"
        value={formData.id}
        onChange={handleChange}
        onBlur={handleIdCheck}
      />
      {idCheckLoading && <p>중복 확인 중....</p>}
      {isIdAvailable === null && <p>아이디 중복 여부를 확인해주세요.</p>}{' '}
      {/* null일 때만 메시지 안내 */}
      {isIdAvailable === false && (
        <p style={{ color: 'red' }}>이미 사용중인 ID입니다.</p>
      )}
      {isIdAvailable === true && (
        <p style={{ color: 'green' }}>사용 가능한 ID입니다.</p>
      )}
      <Input
        label="비밀번호"
        name="password"
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={formData.password}
        onChange={handleChange}
      />
      <Input
        label="비밀번호확인"
        name="passwordConfirm"
        type="password"
        placeholder="비밀번호를 한번 더 입력하세요"
        value={formData.passwordConfirm}
        onChange={handleChange}
      />
      <Input
        label="닉네임"
        name="nickname"
        type="text"
        placeholder="닉네임을 입력해주세요"
        value={formData.nickname}
        onChange={handleChange}
      />
      <Input
        label="이메일"
        name="email"
        type="email"
        placeholder="Qzelly@gmail.com"
        value={formData.email}
        onChange={handleChange}
      />
      {isSubmitting && <p style={{ color: 'red' }}>{isSubmitting}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <Button type="button" disabled={isSubmitting} label="회원가입">
        {isSubmitting ? '회원가입 중...' : '회원가입'}
      </Button>
    </form>
  );
}

export default SignUpForm;
