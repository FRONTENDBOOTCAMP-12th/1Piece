import { useState } from 'react';
import S from './TextArea.module.css';

interface TextAreaProps {
  name?: string;
  placeholder?: string;
  className?: string;
  height?: string;
  maxLength?: number;
  value?: string;
  onChange?: (value: string) => void;
}

function TextArea({
  name,
  placeholder,
  className,
  height,
  maxLength = 500,
  value = '',
  onChange,
}: TextAreaProps) {
  const [text, setText] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newValue = event.target.value;
    if (newValue.length > maxLength) {
      newValue = newValue.substring(0, maxLength);
    }
    setText(newValue);
    onChange?.(newValue);
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
