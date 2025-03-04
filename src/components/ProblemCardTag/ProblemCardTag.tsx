import S from './ProblemCardTag.module.css';

type ProblemCardTagProps = React.ComponentProps<'div'>;

function ProblemCardTag({ children, ...restProps }: ProblemCardTagProps) {
  return (
    <div className={S.cardTag} {...restProps}>
      <img src="/icon/problem-card-tag-icon.svg" />
      <div>{children}</div>
    </div>
  );
}

export default ProblemCardTag;
