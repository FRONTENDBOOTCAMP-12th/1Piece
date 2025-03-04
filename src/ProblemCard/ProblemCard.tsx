import S from './ProblemCard.module.css';

type ProblemCardProps = React.ComponentProps<'img'> &
  React.ComponentProps<'div'> & {
    userName: string;
  };

function ProblemCard({ src, userName, children }: ProblemCardProps) {
  return (
    <div className={S.problemCardContainer}>
      {/* 이미지의 src와 alt텍스트는 부모 컴포넌트에서 받아온다 */}
      <img src={src} alt={userName} className={S.profileImg} />
      <div className={S.problemInfoContainer}>
        {children}
        {/* 더미 텍스트 이후 카드 태그 컴포넌트가 대체 될 예정 */}
        <div>ㅁㄴㅇㄹ</div>
      </div>
    </div>
  );
}

export default ProblemCard;
