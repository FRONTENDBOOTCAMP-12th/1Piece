import useModalVisibleStore from './ProblemModalState';
import useQuizSolvedStore from './QuizSolvedState';
import { useLocation } from 'react-router';
import { useEffect } from 'react';

const ResetState = () => {
  // 페이지가 이동하는지 관찰하기 위한 location
  const location = useLocation();
  // 발생시킬 초기화 함수
  const resetIsVisible = useModalVisibleStore((state) => state.resetIsVisible);
  const setReset = useQuizSolvedStore((state) => state.setReset);

  useEffect(() => {
    // quiz-complete가 pathname에 포함되어있다면 즉, 문제 완료 페이지로 이동했다면 초기화 취소
    if (location.pathname.includes('quiz-complete')) {
      return;
    }

    window.scrollTo(0, 0);

    resetIsVisible();
    setReset();
  }, [location.pathname, resetIsVisible, setReset]);

  return null;
};

export default ResetState;
