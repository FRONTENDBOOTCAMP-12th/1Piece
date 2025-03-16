import { useEffect } from 'react';
import { supabase } from '@/lib/SupabaseClient';
import useModalVisibleStore from '@/lib/ProblemModalState';
import QuizResult from '@/components/QuizResult/QuizResult';
import InputBox from './components/InputBox';
import CommentList from '@/components/CommentList/CommentList';
import S from './Page.module.css';

function QuizCompletePage() {
  const cardInfo = useModalVisibleStore((state) => state.cardInfo);

  console.log(cardInfo.id);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('comment')
        .select('*')
        .eq('card_id', cardInfo.id)
        .order('written_at', { ascending: false });

      console.log('data: ', data);

      if (!data) throw error;
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
        <CommentList />
      </div>
    </div>
  );
}

export default QuizCompletePage;
