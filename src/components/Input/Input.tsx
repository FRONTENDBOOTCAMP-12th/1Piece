import S from './input.module.css';

interface InputProps {
  label: string;
  type: string;
  placeholder?: string;
  maxLength?: number;
}

function Input({ label, type, placeholder,maxLength }:InputProps)  {
  return (
    <div className={S.inputBox}>
      <label className={S.inputContent}>{label}</label>
      <input className={S.input} type={type} placeholder={placeholder} maxLength={maxLength} />
    </div>
  );
};

export default Input;

