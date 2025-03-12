import S from './TextArea.module.css';

interface TextAreaProps {
  name?: string;
  placeholder?: string;
  className?: string;
  height?: string;
}

function TextArea({ name, placeholder, className, height }: TextAreaProps) {
  return (
    <textarea
      name={name}
      className={`${S.textArea} ${className ?? ''}`}
      placeholder={placeholder}
      style={{ height: height ?? '4rem' }}
    />
  );
}

export default TextArea;
