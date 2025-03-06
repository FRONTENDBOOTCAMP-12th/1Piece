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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <form>
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
        value={formData.password}
        placeholder="비밀번호를 입력하세요"
        onChange={handleChange}
      />
      <Input
        label="비밀번호확인"
        name="passwordConfirm"
        type="password"
        value={formData.passwordConfirm}
        placeholder="비밀번호를 한번 더 입력하세요"
        onChange={handleChange}
      />
      <Input
        label="닉네임"
        name="nickname"
        type="text"
        value={formData.nickname}
        placeholder="닉네임을 입력해주세요"
        onChange={handleChange}
      />
      <Input
        label="이메일"
        name="email"
        type="email"
        value={formData.email}
        placeholder="Qzelly@gmail.com"
        onChange={handleChange}
      />
    </form>
  );
}

export default SignUpForm;
