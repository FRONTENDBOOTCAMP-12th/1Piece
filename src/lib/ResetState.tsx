import { useLocation } from 'react-router';
import useModalVisibleStore from './ProblemModalState';
import { useEffect } from 'react';
import useQuizSolvedStore from './QuizSolvedState';

const ResetState = () => {
  const location = useLocation();
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
