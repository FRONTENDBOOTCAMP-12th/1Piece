import S from './Button.module.css';

interface ButtonProps {
  label: string;
  color:
    | 'gray'
    | 'dark-gray'
    | 'primary'
    | 'primary-2'
    | 'secondary'
    | 'tertiary';
  disabled: boolean;
  onClick?: () => void;
}

function Button({
  label,
  color = 'dark-gray',
  disabled = false,
  onClick,
}: ButtonProps) {
  const buttonColor = `var(--${color}-g)`;
  const buttonColorClicked = `var(--clicked-${color}-g)`;

  return (
    <button
      className={S.button}
      style={{ background: buttonColor }}
      aria-label={label}
      aria-disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;
