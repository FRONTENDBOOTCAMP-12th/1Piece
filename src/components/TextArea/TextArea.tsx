import S from './TextArea.module.css';

interface TextAreaProps {
  placeholder?: string;
  className?: string;
  height?: string;
}

function TextArea({ placeholder, className, height }: TextAreaProps) {
  return (
    <div className={S.textAreaContainer}>
      <div className={S.textAreaBoxProblemSet}>
        <textarea
          className={`${S.textArea} ${className ?? ''}`}
          placeholder={placeholder}
          style={height ? { height } : undefined}
        />
      </div>
    </div>
  );
}

export default TextArea;
