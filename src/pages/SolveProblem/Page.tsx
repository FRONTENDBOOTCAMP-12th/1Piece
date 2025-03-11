import useModalVisibleStore from '@/lib/ProblemModalState';
import { useEffect } from 'react';

function SolveProblem() {
  const userInfo = useModalVisibleStore((state) => state.userInfo);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div>문제풀이 페이지입니다.</div>
      <img src={userInfo.src} alt={userInfo.userName} />
    </>
  );
}

export default SolveProblem;
