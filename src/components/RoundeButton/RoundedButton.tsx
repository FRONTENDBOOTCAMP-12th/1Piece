import S from './RoundedButton.module.css';

// 사용자에게 어떤 속성을 사용해야 하는지 지정
// color - 배경색 설정(기본은 primary)
// size - regular(기본)와 large 두 종류
// font - pretendard와 neo둥근모(기본) 설정
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
  // 각각의 기본 값 설정
  color = 'primary',
  size = 'regular',
  font = 'neo',
  children,
  ...restProps
}: RoundedButtonProps) {
  return (
    <button
      // 색상, 사이즈, 폰트 속성을 결합
      className={`${S[`${color}`]} ${S[`${size}`]} ${S.roundedButton} ${S[`${font}`]}`}
      {...restProps}
    >
      {children}
    </button>
  );
}

export default RoundedButton;
