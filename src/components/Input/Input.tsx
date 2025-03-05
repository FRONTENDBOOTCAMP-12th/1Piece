import S from './input.module.css';

interface InputProps {
  label: string;
  type: string;
  placeholder?: string;
  maxLength?: number;
  className?: string;
  hiddenLabel?: boolean;
}

function Input({
  label,
  type,
  placeholder,
  maxLength,
  className,
  hiddenLabel,
}: InputProps) {
  const isProblemSet = className === S.inputProblemSet;
  return (
    <div
      className={`${S.inputBox} ${isProblemSet ? S.inputBoxProblemSet : ''}`}
    >
      {!hiddenLabel && <label className={S.inputContent}>{label}</label>}
      <input
        className={`${S.input} ${className ? className : ''}`}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </div>
  );
}

export default Input;
