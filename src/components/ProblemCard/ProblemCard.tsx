import ProblemCardTag from '../ProblemCardTag/ProblemCardTag';
import S from './ProblemCard.module.css';

type ProblemCardProps = React.ComponentProps<'img'> &
  React.ComponentProps<'div'> & {
    userName: string;
    tags: string[];
  };

function ProblemCard({ src, tags, userName, children }: ProblemCardProps) {
  return (
    <div className={S.problemCardContainer}>
      {/* 이미지의 src와 alt텍스트는 부모 컴포넌트에서 받아온다 */}
      <img src={src} alt={userName} className={S.profileImg} />
      <div className={S.problemInfoContainer}>
        {children}
        {/* 더미 텍스트 이후 카드 태그 컴포넌트가 대체 될 예정 */}
        <div className={S.tagContainer}>
          {tags.map((item) => (
            <ProblemCardTag key={item}>{item}</ProblemCardTag>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProblemCard;
