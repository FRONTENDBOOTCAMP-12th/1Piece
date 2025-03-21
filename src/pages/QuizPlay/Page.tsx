import useModalVisibleStore from '@/lib/ProblemModalState';
import { useEffect, useState } from 'react';
import S from './Page.module.css';
import Quiz from './components/Quiz';
import { supabase } from '@/lib/SupabaseClient';
import useQuizSolvedStore from '@/lib/QuizSolvedState';

interface QuizProps {
  id: number;
  title: string;
  explanation: string;
  correct: string;
  answer: string;
  card_id: number;
}

function QuizPlayPage() {
  // 선택된 문제 카드 상태
  const cardInfo = useModalVisibleStore((state) => state.cardInfo);
  // 퀴즈에 대한 상태(각각)
  const [quizInfo, setQuizInfo] = useState<QuizProps[]>([]);
  const visibleIndex = useQuizSolvedStore((state) => state.visibleIndex);
  const setTotalQuiz = useQuizSolvedStore((state) => state.setTotalQuiz);

  // 선택된 카드를 기반으로 데이터 가져오기
  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('card_id', Number(cardInfo.id));

      setQuizInfo(data!);
      setTotalQuiz(cardInfo.count);

      if (!data) throw error;
    } catch (error) {
      console.log(error);
    }
  };

  // 문제 풀이 페이지로 이동 시, 항상 화면이 최상단에 고정
  // 최초 1회 데이터 불러오기
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchItems();
  }, []);

  return (
    <div className={S.problemContainer}>
      <title>Quzelly | 문제 풀이 페이지</title>
      <h1 className={S.solveProblemTitle}>{cardInfo.title}</h1>
      {/* 퀴즈를 리스트 렌더링으로 렌더링 */}
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
