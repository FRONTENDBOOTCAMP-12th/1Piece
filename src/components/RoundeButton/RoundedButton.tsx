import S from './RoundedButton.module.css';

type RoundedButtonProps = React.ComponentProps<'button'> & {
  color?:
    | 'primary'
    | 'primary2'
    | 'gray'
    | 'darkgray'
    | 'secondary'
    | 'tertiary';
  size?: 'regular' | 'large';
  font?: 'pretendard' | 'neo';
};

function RoundedButton({
  color = 'primary',
  size = 'regular',
  font = 'neo',
  children,
  ...restProps
}: RoundedButtonProps) {
  return (
    <button
      className={`${S[`${color}`]} ${S[`${size}`]} ${S.roundedButton} ${S[`${font}`]}`}
      {...restProps}
    >
      {children}
    </button>
  );
}

export default RoundedButton;
