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
      <h3 className="sr-only">문제 풀이 진행률</h3>
      <div className={S.progressNumber} aria-hidden="true">
        <span className="sr-only">
          {totalQuestions} 중 {currentQuestion} 번{' '}
        </span>
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
