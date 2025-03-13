import { useState } from 'react';
import S from './TextArea.module.css';

interface TextAreaProps {
  name?: string;
  placeholder?: string;
  className?: string;
  height?: string;
  maxLength?: number;
}

function TextArea({
  name,
  placeholder,
  className,
  height,
  maxLength = 500,
}: TextAreaProps) {
  const [text, setText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length > maxLength) {
      event.target.value = event.target.value.substring(0, maxLength);
    }
    setText(event.target.value);
  };

  return (
    <div className={S.textAreaContainer}>
      <textarea
        name={name}
        className={`${S.textArea} ${className ?? ''}`}
        placeholder={placeholder}
        style={{ height: height ?? '4rem' }}
        maxLength={maxLength}
        value={text}
        onChange={handleChange}
        aria-label={placeholder}
      />
      <div className={S.charCount}>
        {text.length}/{maxLength}
      </div>
    </div>
  );
}

export default TextArea;
