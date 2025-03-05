import { useState } from 'react';
import S from './Button.module.css';

type ButtonProps = React.ComponentProps<'button'> & {
  label?: string;
  color?:
    | 'gray'
    | 'dark-gray'
    | 'primary'
    | 'primary-2'
    | 'secondary'
    | 'tertiary';
  disabled?: boolean;
  onClick?: () => void;
};

function Button({
  label,
  color = 'dark-gray',
  disabled = false,
  onClick,
}: ButtonProps) {
  const buttonColor = `var(--${color}-g)`;
  const buttonColorClicked = `var(--clicked-${color}-g)`;

  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = () => {
    setIsActive(true);
  };
  const handleMouseUp = () => {
    setIsActive(false);
  };

  const styles = {
    background: isActive ? buttonColorClicked : buttonColor,
  };

  return (
    <button
      className={S.button}
      style={styles}
      aria-label={label}
      aria-disabled={disabled}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {label}
    </button>
  );
}

export default Button;
