import S from './QuizResult.module.css';

interface QuizResultProps {
  quizTitle: string;
  correct?: number;
  totalQuestions?: number;
}

function QuizResult({
  quizTitle,
  correct = 9,
  totalQuestions = 10,
}: QuizResultProps) {
  return (
    <section className={S.container} aria-labelledby="quiz-result-title">
      <h2 id="quiz-result-title" className="sr-only">
        문제 풀이 결과
      </h2>
      <img
        src="/images/solved_message.svg"
        alt="퀴즈를 완료했습니다! 축하합니다~"
      />
      <div className={S.quizTitle}>{quizTitle}</div>
      <div className={S.scoreContainer}>
        <span className={S.scoreText}>
          {correct} / {totalQuestions}
        </span>
      </div>
    </section>
  );
}

export default QuizResult;
