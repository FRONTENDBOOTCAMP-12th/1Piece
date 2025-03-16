import { useState, useEffect } from 'react';
import { supabase } from '@/lib/SupabaseClient';
import useModalVisibleStore from '@/lib/ProblemModalState';
import QuizResult from '@/components/QuizResult/QuizResult';
import InputBox from './components/InputBox';
import CommentList from '@/components/CommentList/CommentList';
import S from './Page.module.css';

interface CommentData {
  id: string;
  userNickname: string;
  userLevel: number;
  commentedAt: string;
  content: string;
}

function QuizCompletePage() {
  const [comments, setComments] = useState<CommentData[]>([]);
  const cardInfo = useModalVisibleStore((state) => state.cardInfo);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('comment')
        .select('*, users(*)')
        .eq('card_id', cardInfo.id)
        .order('written_at', { ascending: false });

      if (!data) throw error;

      console.log('data: ', data);

      const newData = data.map((item) => ({
        id: `${item.id}`,
        userNickname: item.users.nickname,
        userLevel: item.users.level,
        commentedAt: item.written_at,
        content: item.comment,
      }));

      setComments(newData);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className={S.pageContainer}>
      <QuizResult />
      <div className={S.rightSection}>
        <InputBox />
        <CommentList comments={comments} />
      </div>
    </div>
  );
}

export default QuizCompletePage;
