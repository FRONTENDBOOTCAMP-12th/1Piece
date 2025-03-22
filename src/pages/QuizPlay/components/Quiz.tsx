import RoundedButton from '@/components/RoundedButton/RoundedButton';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import useModalVisibleStore from '@/lib/ProblemModalState';
import useQuizSolvedStore from '@/lib/QuizSolvedState';
import Option from '@/components/Option/Option';
import { FaArrowRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import { useRef, useState } from 'react';
import S from './Quiz.module.css';

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
  // 설명이 보여지는지에 대한 상태
  const [isVisibleDesc, setIsVisibleDesc] = useState(false);
  // 답안지를 선택했는지에 대한 상태
  const [isSelectOption, setIsSelectOption] = useState(false);
  // 정답인지 오답인지에 대한 상태
  const [correctState, setCorrectState] = useState(true);
  // 문제 선택지 버튼들과 설명 버튼을 ref로 관찰
  const buttonRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  // 선택된 카드 상태
  const cardInfo = useModalVisibleStore((state) => state.cardInfo);
  // 현재 보여지는 문제에 대한 상태
  const setVisibleIndex = useQuizSolvedStore((state) => state.setVisibleIndex);
  const visibleIndex = useQuizSolvedStore((state) => state.visibleIndex);
  const totalQuiz = useQuizSolvedStore((state) => state.totalQuiz);
  const setCorrectQuiz = useQuizSolvedStore((state) => state.setCorrectQuiz);
  const navigate = useNavigate();

  // 현재 선택지가 쉼표로 구분된 형식이라 이를 split을 사용하여 배열로 변환
  const options = answer.split(',');

  // 공백 제거
  const deleteBlank = (str: string): string => {
    return str.replace(/\s/g, '');
  };

  // 이후 코드 리팩토링을 하며 재구현 할 예정
  // useEffect(() => {
  //   window.scrollTo({
  //     top: descRef.current!.offsetTop - descRef.current!.offsetHeight,
  //     behavior: 'smooth',
  //   });
  // }, [isVisibleDesc]);

  // 정답 선택 시 일어나는 이벤트
  const handleHitQuiz = (isCorrect: boolean) => {
    const buttonCollection = buttonRef.current?.children;

    // 모든 버튼 disabled 처리
    for (const i of buttonCollection!) {
      (i as HTMLButtonElement).disabled = true;
    }

    // 정답 선택한 상태와 정답인지 체크
    setIsSelectOption(true);
    setCorrectState(isCorrect);
  };

  // 다음 문제 버튼 이벤트
  const handleNextProblem = () => {
    // 만약 문제를 풀지 않았다면 이벤트 발생X
    if (!isSelectOption) {
      return;
    }

    if (correctState) {
      setCorrectQuiz();
    }

    // 다음 문제가 없다면 문제풀이 완료 페이지로 이동
    if (visibleIndex + 1 === totalQuiz) {
      navigate(`/quiz-complete/?problemId=${cardInfo.id}`);
      return;
    }

    setVisibleIndex();
    window.scrollTo(0, 0);
  };

  // 설명 버튼 이벤트
  const handleShowDescription = () => {
    if (!isSelectOption) {
      return;
    }

    setIsVisibleDesc(true);
  };

  return (
    <>
      {/* 자기 index차례에만 보여지게 하기 */}
      {visible ? (
        <>
          <div
            className={`${S.quizContainer} ${isSelectOption ? (correctState ? S.correctBgc : S.inCorrectBgc) : ''}`}
          >
            <h2 className={S.quizTitle}>{title}</h2>
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
          {/* 정답인지에 따라 다른 UI */}
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
