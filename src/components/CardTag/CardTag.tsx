import S from './CardTag.module.css';

type CardTagProps = React.ComponentProps<'div'>;

function CardTag({ children, ...restProps }: CardTagProps) {
  return (
    <div className={S.cardTag} {...restProps}>
      <img src="/icons/problem_card_tag_icon.svg" alt="" />
      <div>{children}</div>
    </div>
  );
}

export default CardTag;
