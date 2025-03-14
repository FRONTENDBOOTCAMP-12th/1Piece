import useModalVisibleStore from '@/lib/ProblemModalState';
import CardTag from '../CardTag/CardTag';
import BookMark from './BookMark';
import S from './Card.module.css';
import { type CardInfo } from '@/lib/ProblemModalState';

type CardProps = React.ComponentProps<'img'> &
  React.ComponentProps<'div'> & {
    userName: string;
    tags: string[];
    checked: boolean;
    description?: string;
  };

function Card({
  id,
  src,
  tags,
  userName,
  checked,
  description,
  children,
}: CardProps) {
  // 모달을 클릭할 시 나타나게 할 함수
  const setVisible = useModalVisibleStore((state) => state.setVisible);
  // 선택한 카드의 정보를 저장하기 위한 함수
  const setCardInfo = useModalVisibleStore((state) => state.setCardInfo);

  // props로 전달받은 값으로 구성한 새로운 userInfo
  const userCardInfo = {
    id,
    src,
    tags,
    userName,
    description,
    title: children,
  };

  // 카드 클릭 시 정보 저장 후 모달 열기
  const handleOpenModal = () => {
    setCardInfo(userCardInfo as CardInfo);
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
            <CardTag key={item}>{item}</CardTag>
          ))}
        </div>
      </div>
      <BookMark checked={checked} />
    </div>
  );
}

export default Card;
