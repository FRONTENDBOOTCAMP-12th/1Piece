import useModalVisibleStore from '@/lib/ProblemModalState';
import { useEffect } from 'react';
import S from './ProblemSolve.module.css';
import Problem from './components/Problem';

function SolveProblem() {
  const cardInfo = useModalVisibleStore((state) => state.cardInfo);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={S.problemContainer}>
      <h3 className={S.solveProblemTitle}>{cardInfo.title}</h3>
      <Problem />
    </div>
  );
}

export default SolveProblem;
