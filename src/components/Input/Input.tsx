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
  disabled?: boolean;
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
  disabled = false,
  onChange,
  onBlur,
  ...restProps
}: InputProps) {
  const id = name ?? `input-${Math.random().toString(36).substr(2, 9)}`;
  const isProblemSet = className === S.inputProblemSet;
  return (
    <div
      className={`${S.inputBox} ${isProblemSet ? S.inputBoxProblemSet : ''}`}
    >
      {!hiddenLabel && (
        <label className={S.inputContent} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={`${S.input} ${className ?? ''}`}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        {...restProps}
      />
    </div>
  );
}

export default Input;
