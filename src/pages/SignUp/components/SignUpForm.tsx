import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { useState } from 'react';

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

  // const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const startIsSubmitting = () => setIsSubmitting(true);
  const stopIsSubmitting = () => setIsSubmitting(false);

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

    if (!passwordValidate() || !emailValidate()) {
      return;
    }

    startIsSubmitting();

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
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
      />
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
      <Button type="button" disabled={isSubmitting}>
        {isSubmitting ? '회원가입 중...' : '회원가입'}
      </Button>
    </form>
  );
}

export default SignUpForm;
