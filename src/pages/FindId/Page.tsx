import toast, { Toaster } from 'react-hot-toast';
import { supabase } from '@/lib/SupabaseClient';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { useNavigate } from 'react-router';
import S from './Page.module.css';
import { useState } from 'react';
import Swal from 'sweetalert2';

function FindIdPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleFindId = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('이메일을 입력해주세요');
      return;
    }
    try {
      const { data, error } = await supabase
        .from('users')
        .select('user_id')
        .eq('email', email)
        .single();

      if (error) throw error;
      if (data) {
        await Swal.fire({
          icon: 'success',
          title: '아이디 찾기 성공',
          text: `입력하신 email로 가입하신 ID는 ${data.user_id}입니다`,
          confirmButtonText: '확인',
        });
        navigate('/login');
      } else {
        toast.error('해당 email로 등록된 아이디가 없습니다.');
        setEmail('');
      }
    } catch {
      toast.error('아이디 찾기에 실패했습니다');
      setEmail('');
    }
  };

  return (
    <div className={S.container}>
      <title>Quzelly | 아이디 찾기</title>
      <form className={S.findIdForm} onSubmit={handleFindId}>
        <h1 className={S.title}>아이디찾기</h1>
        <Input
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={S.inputForm}
        />
        <Button label="id찾기" color={'secondary'} className={S.submitButton} />
      </form>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default FindIdPage;
