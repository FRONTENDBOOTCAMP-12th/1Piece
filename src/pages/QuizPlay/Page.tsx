import useModalVisibleStore from '@/lib/ProblemModalState';
import { useEffect, useState } from 'react';
import S from './Page.module.css';
import Quiz from './components/Quiz';
import { supabase } from '@/lib/SupabaseClient';
import useQuizSolvedStore from '@/lib/QuizSolvedState';

function QuizPlayPage() {
  const cardInfo = useModalVisibleStore((state) => state.cardInfo);
  const [quizInfo, setQuizInfo] = useState([]);
  const visibleIndex = useQuizSolvedStore((state) => state.visibleIndex);
  const setTotalQuiz = useQuizSolvedStore((state) => state.setTotalQuiz);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('card_id', Number(cardInfo.id));

      setQuizInfo(data);
      setTotalQuiz(cardInfo.count);

      if (!data) throw error;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchItems();
  }, []);

  return (
    <div className={S.problemContainer}>
      <h3 className={S.solveProblemTitle}>{cardInfo.title}</h3>
      {quizInfo.map((item, index) => (
        <Quiz
          totalQuizCount={quizInfo.length}
          currentQuizCount={index + 1}
          title={item.title}
          explanation={item.explanation}
          correct={item.correct}
          answer={item.answer}
          key={item.id}
          visible={visibleIndex === index}
        />
      ))}
    </div>
  );
}

export default QuizPlayPage;
