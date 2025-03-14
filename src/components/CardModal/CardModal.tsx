import S from './CardModal.module.css';
import CardTag from '../CardTag/CardTag';
import RoundedButton from '../RoundedButton/RoundedButton';
import useModalVisibleStore from '@/lib/ProblemModalState';
import { NavLink } from 'react-router';

type CardModalProps = React.ComponentProps<'img'> &
  React.ComponentProps<'div'> & {
    userName: string;
    tags: string[];
    description: string;
  };

function CardModal({
  src,
  tags,
  userName,
  children,
  description,
}: CardModalProps) {
  // 모달의 오픈 여부를 나타내는 상태
  const isVisible = useModalVisibleStore((state) => state.isVisible);
  // 모달을 닫아주는 함수
  const setNonVisible = useModalVisibleStore((state) => state.setNonVisible);
  // 링크 이동을 위한 userInfo의 id만 사용
  const { id } = useModalVisibleStore((state) => state.cardInfo);

  const handleClose = () => {
    setNonVisible();
  };

  return (
    <div className={`${S.backdrop} ${!isVisible ? S.close : ''}`}>
      <div className={S.modalContainer}>
        <div className={S.header}>
          <p className={S.alert}>문제를 푸시겠습니까?</p>
        </div>
        <div className={S.content}>
          <img src={src} alt={userName} className={S.profileImg} />
          <div className={S.info}>
            <p className={S.problemTitle}>{children}</p>
            <div className={S.tagContainer}>
              {tags.map((item) => (
                <CardTag key={item}>{item}</CardTag>
              ))}
            </div>{' '}
            <p className={S.description}>{description}</p>
          </div>
        </div>
        <div className={S.btns}>
          <RoundedButton
            color="gray"
            size="large"
            font="neo"
            onClick={handleClose}
          >
            취소
          </RoundedButton>
          {/* 현재 렌더링 시 a태그 내부에 버튼 태그가 발생하여 이후 수정해야함  */}
          <NavLink to={`/solve-problem/?problemId=${id}`}>
            <RoundedButton
              color="primary"
              size="large"
              font="neo"
              onClick={handleClose}
            >
              풀기
            </RoundedButton>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default CardModal;
