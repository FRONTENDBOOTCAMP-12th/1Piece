import ProgressBar from '@/components/ProgressBar/ProgressBar';
import Option from '@/components/Option/Option';
import S from './Quiz.module.css';
import RoundedButton from '@/components/RoundedButton/RoundedButton';
import { FaArrowRight } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';

function Quiz() {
  const [isVisibleDesc, setIsVisibleDesc] = useState(false);
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({
      top: descRef.current!.offsetTop - descRef.current!.offsetHeight,
      behavior: 'smooth',
    });
  }, [isVisibleDesc]);

  const handleNextProblem = () => {
    console.log(1);
  };

  const handleShowDescription = () => {
    setIsVisibleDesc(true);
  };

  return (
    <>
      <ProgressBar currentQuestion={2} totalQuestions={10} />
      <div className={S.optionContainer}>
        <Option content="1" isCorrect={true} />
        <Option content="2" isCorrect={false} />
        <Option content="3" isCorrect={false} />
        <Option content="4" isCorrect={false} />
      </div>
      <div className={S.solveCorrect}>
        <img src="/images/jellyfish.png" alt="해파리요정" />
        <p>정답입니다~!</p>
      </div>
      <div className={S.solveInCorrect}>
        <img src="/images/jellyfish.png" alt="해파리요정" />
        <p>오답입니다ㅜㅜ..</p>
      </div>
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
        해설 영역에 들어갈 텍스트
      </div>
    </>
  );
}

export default Quiz;
