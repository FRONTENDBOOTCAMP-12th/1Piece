import express from 'express';
import dotenv from 'dotenv';
import { supabaseAdmin } from './supabase.js';
import cors from 'cors';
dotenv.config();

const app = express();

const port = 4000;
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://quzelly.vercel.app'],
    credentials: true,
  })
);

app.use(express.json());

app.post('/reset-pw', async (req, res) => {
  console.log(req.body);
  const { email, newPw } = req.body;

  if (!email || !newPw) {
    return res
      .status(400)
      .json({ error: '이메일과 새 비밀번호는 필수입니다.' });
  }
  try {
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('auth_uid')
      .eq('email', email)
      .single();

    if (userError) {
      console.error('사용자에러:', userError);
      return res.status(400).json({ error: '사용자를 찾을 수 없습니다.' });
    }
    console.log(user);

    const { data: authUser, error: authError } =
      await supabaseAdmin.auth.admin.getUserById(user.auth_uid);

    if (authError || !authUser) {
      console.error('Authentication 에러:', authError);
      return res.status(400).json({ error: '사용자 인증을 찾을 수 없습니다.' });
    }
    console.log('인증된 사용자:', authUser);

    const { error: passwordError } =
      await supabaseAdmin.auth.admin.updateUserById(user.auth_uid, {
        password: newPw,
      });

    if (passwordError) {
      console.error('비밀번호 업데이트 에러:', passwordError);
      return res.status(400).json({ error: '비밀번호 업데이트 실패' });
    }
    res
      .status(200)
      .json({ message: '비밀번호가 성공적으로 업데이트되었습니다.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`서버를 가동합니다. http://localhost:${port}`);
});
