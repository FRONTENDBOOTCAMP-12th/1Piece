import S from './ProblemCard.module.css';

type ProblemCardProps = React.ComponentProps<'img'> &
  React.ComponentProps<'div'> & {
    userName: string;
  };

function ProblemCard({ src, userName, children }: ProblemCardProps) {
  return (
    <div className={S.problemCardContainer}>
      <img src={src} alt={userName} className={S.profileImg} />
      <div className={S.problemInfoContainer}>
        {children}
        <div>ㅁㄴㅇㄹ</div>
      </div>
    </div>
  );
}

export default ProblemCard;
