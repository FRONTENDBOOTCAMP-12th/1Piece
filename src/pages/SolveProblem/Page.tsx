import useModalVisibleStore from '@/lib/ProblemModalState';
import { useEffect } from 'react';

function SolveProblem() {
  const cardInfo = useModalVisibleStore((state) => state.cardInfo);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div>문제풀이 페이지입니다.</div>
      <img src={cardInfo.src} alt={cardInfo.userName} />
    </>
  );
}

export default SolveProblem;
