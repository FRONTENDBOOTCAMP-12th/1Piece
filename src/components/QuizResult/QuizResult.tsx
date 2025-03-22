import S from './QuizResult.module.css';

interface QuizResultProps {
  quizTitle: string;
  correct?: number;
  totalQuestions?: number;
  // newBadge?: boolean; // 새로운 뱃지 획득 여부
  // badgeSrc?: string; // 획득한 뱃지 이미지 경로
}

function QuizResult({
  quizTitle,
  correct = 9,
  totalQuestions = 10,
  // newBadge = true,
  // badgeSrc,
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
      {/* {newBadge && (
        <div className={S.badgeSection}>
          <img className={S.badge} src={badgeSrc} alt="획득한 뱃지" />
          <p className={S.badgeMessage}>
            <span className={S.newBadge}>새로운 뱃지</span> 획득했어요!
          </p>
        </div>
      )} */}
    </section>
  );
}

export default QuizResult;
