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
      return res.status(400).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    const { data: authUser, error: authError } =
      await supabaseAdmin.auth.admin.getUserById(user.auth_uid);

    if (authError || !authUser) {
      return res.status(400).json({ error: '사용자 인증을 찾을 수 없습니다.' });
    }

    const { error: passwordError } =
      await supabaseAdmin.auth.admin.updateUserById(user.auth_uid, {
        password: newPw,
      });

    if (passwordError) {
      return res.status(400).json({ error: '비밀번호 업데이트 실패' });
    }
    res
      .status(200)
      .json({ message: '비밀번호가 성공적으로 업데이트되었습니다.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/delete-user', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: '유저 ID가 필요합니다.' });
  }

  try {
    const { error: dbError } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('auth_uid', userId);
    if (dbError) {
      return res.status(500).json({ success: false, message: 'DB 삭제 실패' });
    }

    const { error: authError } =
      await supabaseAdmin.auth.admin.deleteUser(userId);
    if (authError) {
      return res
        .status(500)
        .json({ success: false, message: 'Auth 삭제 실패' });
    }

    return res.json({ success: true, message: '회원 탈퇴 완료' });
  } catch (error) {
    return res.status(500).json({ success: false, message: '서버 오류 발생' });
  }
});

app.listen(port, () => {
  console.log(`서버를 가동합니다. http://localhost:${port}`);
});
