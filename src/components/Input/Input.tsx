import S from './Input.module.css';

interface InputProps {
  label: string;
  name?: string;
  type: string;
  placeholder?: string;
  maxLength?: number;
  className?: string;
  hiddenLabel?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  label,
  name,
  type,
  placeholder,
  maxLength,
  className,
  hiddenLabel,
  value,
  onChange,
  onBlur,
  ...restProps
}: InputProps) {
  const isProblemSet = className === S.inputProblemSet;
  return (
    <div
      className={`${S.inputBox} ${isProblemSet ? S.inputBoxProblemSet : ''}`}
    >
      {!hiddenLabel && <label className={S.inputContent}>{label}</label>}
      <input
        className={`${S.input} ${className ?? ''}`}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={onChange}
        onBlur={onBlur}
        {...restProps}
      />
    </div>
  );
}

export default Input;
