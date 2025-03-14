import ProgressBar from '@/components/ProgressBar/ProgressBar';
import Option from '@/components/Option/Option';
import S from './Quiz.module.css';
import RoundedButton from '@/components/RoundedButton/RoundedButton';
import { FaArrowRight } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';

interface QuizProps {
  totalQuizCount: number;
  currentQuizCount: number;
  title: string;
  answer: string;
  correct: string;
  explanation: string;
  next: object;
}

function Quiz({
  totalQuizCount,
  currentQuizCount,
  title,
  answer,
  correct,
  explanation,
}: QuizProps) {
  const [isVisibleDesc, setIsVisibleDesc] = useState(false);
  const [isVisibleCorrect, setIsVisibleCorrect] = useState(false);
  const [correctState, setCorrectState] = useState(true);
  const buttonRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  const options = answer.split(',');
  const deleteBlank = (str: string): string => {
    return str.replace(/\s/g, '');
  };

  useEffect(() => {
    window.scrollTo({
      top: descRef.current!.offsetTop - descRef.current!.offsetHeight,
      behavior: 'smooth',
    });
  }, [isVisibleDesc]);

  const handleHitQuiz = (isCorrect: boolean) => {
    const buttonCollection = buttonRef.current?.children;

    for (const i of buttonCollection!) {
      (i as HTMLButtonElement).disabled = true;
      (i as HTMLButtonElement).ariaDisabled = 'true';
    }

    setIsVisibleCorrect(true);
    setCorrectState(isCorrect);
  };

  const handleNextProblem = () => {
    console.log(1);
  };

  const handleShowDescription = () => {
    setIsVisibleDesc(true);
  };

  return (
    <>
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
      {isVisibleCorrect ? (
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
        >
          <FaArrowRight size={32} />
        </RoundedButton>
        <RoundedButton size="large" onClick={handleShowDescription}>
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
  );
}

export default Quiz;
