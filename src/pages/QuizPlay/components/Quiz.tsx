import ProgressBar from '@/components/ProgressBar/ProgressBar';
import Option from '@/components/Option/Option';
import S from './Quiz.module.css';
import RoundedButton from '@/components/RoundedButton/RoundedButton';
import { FaArrowRight } from 'react-icons/fa6';
import { useRef, useState } from 'react';
import useQuizSolvedStore from '@/lib/QuizSolvedState';
import { useNavigate } from 'react-router';

interface QuizProps {
  totalQuizCount: number;
  currentQuizCount: number;
  title: string;
  answer: string;
  correct: string;
  explanation: string;
  visible: boolean;
}

function Quiz({
  totalQuizCount,
  currentQuizCount,
  title,
  answer,
  correct,
  explanation,
  visible,
}: QuizProps) {
  const [isVisibleDesc, setIsVisibleDesc] = useState(false);
  const [isSelectOption, setIsSelectOption] = useState(false);
  const [correctState, setCorrectState] = useState(true);
  const buttonRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const setVisibleIndex = useQuizSolvedStore((state) => state.setVisibleIndex);
  const visibleIndex = useQuizSolvedStore((state) => state.visibleIndex);
  const totalQuiz = useQuizSolvedStore((state) => state.totalQuiz);
  const setReset = useQuizSolvedStore((state) => state.setReset);
  const navigate = useNavigate();

  const options = answer.split(',');
  const deleteBlank = (str: string): string => {
    return str.replace(/\s/g, '');
  };

  // useEffect(() => {
  //   window.scrollTo({
  //     top: descRef.current!.offsetTop - descRef.current!.offsetHeight,
  //     behavior: 'smooth',
  //   });
  // }, [isVisibleDesc]);

  const handleHitQuiz = (isCorrect: boolean) => {
    const buttonCollection = buttonRef.current?.children;

    for (const i of buttonCollection!) {
      (i as HTMLButtonElement).disabled = true;
      (i as HTMLButtonElement).ariaDisabled = 'true';
    }

    setIsSelectOption(true);
    setCorrectState(isCorrect);
  };

  const handleNextProblem = () => {
    if (!isSelectOption) {
      return;
    }

    if (visibleIndex + 1 === totalQuiz) {
      navigate('/quiz-complete');
      setReset();
      return;
    }

    setVisibleIndex();
    window.scrollTo(0, 0);
  };

  const handleShowDescription = () => {
    if (!isSelectOption) {
      return;
    }

    setIsVisibleDesc(true);
  };

  return (
    <>
      {visible ? (
        <>
          <div
            className={`${S.quizContainer} ${isSelectOption ? (correctState ? S.correctBgc : S.inCorrectBgc) : ''}`}
          >
            <p className={S.quizTitle}>{title}</p>
            <ProgressBar
              currentQuestion={currentQuizCount}
              totalQuestions={totalQuizCount}
            />
            <div className={S.optionContainer} ref={buttonRef}>
              <Option
                content={options[0]}
                isCorrect={deleteBlank(options[0]) === deleteBlank(correct)}
                onHit={handleHitQuiz}
              />
              <Option
                content={options[1]}
                isCorrect={deleteBlank(options[1]) === deleteBlank(correct)}
                onHit={handleHitQuiz}
              />
              <Option
                content={options[2]}
                isCorrect={deleteBlank(options[2]) === deleteBlank(correct)}
                onHit={handleHitQuiz}
              />
              <Option
                content={options[3]}
                isCorrect={deleteBlank(options[3]) === deleteBlank(correct)}
                onHit={handleHitQuiz}
              />
            </div>
          </div>
          {isSelectOption ? (
            correctState ? (
              <div className={`${S.solveCorrect} ${S.correct}`}>
                <img src="/images/jellyfish.png" alt="해파리정답요정" />
                <p>정답입니다~!</p>
              </div>
            ) : (
              <div className={`${S.solveInCorrect} `}>
                <img src="/images/jellyfish.png" alt="해파리오답요정" />
                <p>오답입니다ㅜㅜ..</p>
              </div>
            )
          ) : null}
          <div className={S.showProblemDetailBtn}>
            <RoundedButton
              size="large"
              color="gray"
              style={{ paddingInline: `var(--space-10)` }}
              onClick={handleNextProblem}
              aria-disabled={!isSelectOption}
              aria-label="다음 문제"
            >
              <FaArrowRight size={32} />
            </RoundedButton>
            <RoundedButton
              size="large"
              onClick={handleShowDescription}
              aria-disabled={!isSelectOption}
            >
              해설보기
            </RoundedButton>
          </div>
          <div
            className={`${S.problemDescription} ${isVisibleDesc ? S.showDesc : S.hideDesc}`}
            ref={descRef}
          >
            {explanation}
          </div>
        </>
      ) : null}
    </>
  );
}

export default Quiz;
