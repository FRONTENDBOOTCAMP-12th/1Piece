import S from './ProblemCardTag.module.css';

type ProblemCardTagProps = React.ComponentProps<'div'>;

function ProblemCardTag({ children, ...restProps }: ProblemCardTagProps) {
  return (
    <div className={S.cardTag} {...restProps}>
      <img src="/icons/problem_card_tag_icon.svg" alt="" />
      <div>{children}</div>
    </div>
  );
}

export default ProblemCardTag;
