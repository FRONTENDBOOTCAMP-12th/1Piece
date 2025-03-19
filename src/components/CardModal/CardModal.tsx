import useLoginStore from '@/lib/LoginState';
import useModalVisibleStore from '@/lib/ProblemModalState';
import { useNavigate } from 'react-router';
import CardTag from '../CardTag/CardTag';
import RoundedButton from '../RoundedButton/RoundedButton';
import S from './CardModal.module.css';

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
  const isLogin = useLoginStore((state) => state.isLogin);
  const navigation = useNavigate();

  const handleClose = () => {
    setNonVisible();
  };

  // 로그인 상태라면 퀴즈 풀기로, 아니라면 로그인 페이지로 이동
  const handleMoveToSolveCard = () => {
    if (isLogin) {
      navigation(`/quiz-play/?problemId=${id}`);
    } else {
      navigation('/login');
    }
  };

  return (
    <div className={`${S.backdrop} ${!isVisible ? S.close : ''}`}>
      <div className={S.modalContainer}>
        <div className={S.header}>
          <p className={S.alert}>문제를 푸시겠습니까?</p>
        </div>
        <div className={S.content}>
          <img
            src={src}
            alt={userName}
            className={S.profileImg}
            onError={(e) => {
              e.currentTarget.src = '/dummy/dummy_profile.png';
            }}
          />
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
          <RoundedButton
            color="primary"
            size="large"
            font="neo"
            onClick={handleMoveToSolveCard}
          >
            풀기
          </RoundedButton>
        </div>
      </div>
    </div>
  );
}

export default CardModal;
