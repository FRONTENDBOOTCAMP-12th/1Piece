import { useLocation } from 'react-router';
import useModalVisibleStore from './ProblemModalState';
import { useEffect } from 'react';
import useQuizSolvedStore from './QuizSolvedState';

const ResetState = () => {
  // 페이지가 이동하는지 관찰하기 위한 location
  const location = useLocation();
  // 발생시킬 초기화 함수
  const resetIsVisible = useModalVisibleStore((state) => state.resetIsVisible);
  const setReset = useQuizSolvedStore((state) => state.setReset);

  useEffect(() => {
    return () => {
      resetIsVisible();
      setReset();
    };
  }, [location.pathname]);

  return null;
};

export default ResetState;
