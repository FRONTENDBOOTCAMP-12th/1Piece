import useModalVisibleStore from '@/lib/ProblemModalState';
import { useEffect } from 'react';
import S from './Page.module.css';
import Quiz from './components/Quiz';

function QuizPlayPage() {
  const cardInfo = useModalVisibleStore((state) => state.cardInfo);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={S.problemContainer}>
      <h3 className={S.solveProblemTitle}>{cardInfo.title}</h3>
      <Quiz />
    </div>
  );
}

export default QuizPlayPage;
