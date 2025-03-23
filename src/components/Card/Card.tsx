import useModalVisibleStore from '@/lib/ProblemModalState';
import { type CardInfo } from '@/lib/ProblemModalState';
import CardTag from '../CardTag/CardTag';
import BookMark from './BookMark';
import S from './Card.module.css';
import useProfileStore from '@/lib/UserProfileState';

type CardProps = React.ComponentProps<'img'> &
  React.ComponentProps<'div'> & {
    userName: string;
    tags: string[];
    checked: boolean;
    description?: string;
    count: number;
  };

function Card({
  id,
  src,
  tags,
  userName,
  description,
  children,
  count,
}: CardProps) {
  // 모달을 클릭할 시 나타나게 할 함수
  const setVisible = useModalVisibleStore((state) => state.setVisible);
  // 선택한 카드의 정보를 저장하기 위한 함수
  const setCardInfo = useModalVisibleStore((state) => state.setCardInfo);
  const setIsWriter = useModalVisibleStore((state) => state.setIsWriter);
  const userProfile = useProfileStore((state) => state.userProfile);

  // props로 전달받은 값으로 구성한 새로운 userInfo
  const userCardInfo = {
    id,
    src,
    tags,
    userName,
    description,
    title: children,
    count,
  };

  // 카드 클릭 시 정보 저장 후 모달 열기
  const handleOpenModal = () => {
    setCardInfo(userCardInfo as CardInfo);
    setVisible();
    setIsWriter(userName === userProfile?.nickname);
  };

  return (
    <div className={S.problemCardContainer}>
      <button onClick={handleOpenModal} className={S.problemCardButton}>
        {/* 이미지의 src와 alt텍스트는 부모 컴포넌트에서 받아온다 */}
        <img
          src={src}
          alt={userName}
          className={S.profileImg}
          //기본 이미지 넣어둠 (목록은 아직 프로필 사진 다 안 가져와져서?)
          onError={(e) => {
            e.currentTarget.src = '/dummy/dummy_profile.png';
          }}
        />
        <span className={S.problemInfoContainer}>
          <span className={S.problemTitle}>{children}</span>
          {/* 더미 텍스트 이후 카드 태그 컴포넌트가 대체 될 예정 */}
          <span className={S.tagContainer}>
            {tags.map((item) => (
              <CardTag key={item}>{item}</CardTag>
            ))}
          </span>
        </span>
      </button>
      <BookMark id={id!} />
    </div>
  );
}

export default Card;
