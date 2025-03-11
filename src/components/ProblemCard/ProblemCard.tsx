import useModalVisibleStore from '@/lib/ProblemModalState';
import ProblemCardTag from '../ProblemCardTag/ProblemCardTag';
import BookMark from './BookMark';
import S from './ProblemCard.module.css';

type ProblemCardProps = React.ComponentProps<'img'> &
  React.ComponentProps<'div'> & {
    userName: string;
    tags: string[];
    checked: boolean;
  };

function ProblemCard({
  src,
  tags,
  userName,
  checked,
  children,
}: ProblemCardProps) {
  const setVisible = useModalVisibleStore((state) => state.setVisible);
  const setUserInfo = useModalVisibleStore((state) => state.setUserInfo);

  const userCardInfo = {
    src,
    tags,
    userName,
    description: 'asdf',
    title: children,
  };

  const handleOpenModal = () => {
    setUserInfo(userCardInfo);
    setVisible();
  };

  return (
    <div
      className={S.problemCardContainer}
      role="button"
      onClick={handleOpenModal}
      tabIndex={0}
    >
      {/* 이미지의 src와 alt텍스트는 부모 컴포넌트에서 받아온다 */}
      <img src={src} alt={userName} className={S.profileImg} />
      <div className={S.problemInfoContainer}>
        <p className={S.problemTitle}>{children}</p>
        {/* 더미 텍스트 이후 카드 태그 컴포넌트가 대체 될 예정 */}
        <div className={S.tagContainer}>
          {tags.map((item) => (
            <ProblemCardTag key={item}>{item}</ProblemCardTag>
          ))}
        </div>
      </div>
      <BookMark checked={checked} />
    </div>
  );
}

export default ProblemCard;
