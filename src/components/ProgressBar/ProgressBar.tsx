import S from './ProgressBar.module.css';

interface ProgressBarProps {
  currentQuestion?: number;
  totalQuestions?: number;
}

function ProgressBar({
  currentQuestion = 1,
  totalQuestions = 10,
}: ProgressBarProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <section className={S.progressContainer}>
      <h2 className="sr-only">문제 풀이 진행률</h2>
      <div
        className={S.progressNumber}
        aria-label={`${totalQuestions}문제 중 ${currentQuestion}번째 문제`}
      >
        {currentQuestion} / {totalQuestions}
      </div>
      <div className={S.background}>
        <div
          className={S.bar}
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

export default ProgressBar;
