import S from './Question.module.css';

interface QuestionSetProps {
  label: string;
  placeholder?: string;
  className?: string;
}

function QuestionSet({ label, placeholder, className }: QuestionSetProps) {
  return (
    <div className={S.questionBox}>
      <label className={S.questionLabel}>{label}</label>
      <textarea
        className={`${S.questionArea} ${className ? className : ''}`}
        placeholder={placeholder}
      />
    </div>
  );
}

export default QuestionSet;
