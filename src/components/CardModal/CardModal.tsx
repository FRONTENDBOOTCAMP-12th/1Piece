import useModalVisibleStore from '@/lib/ProblemModalState';
import RoundedButton from '../RoundedButton/RoundedButton';
import withReactContent from 'sweetalert2-react-content';
import useProfileStore from '@/lib/UserProfileState';
import { supabase } from '@/lib/SupabaseClient';
import useLoginStore from '@/lib/LoginState';
import { useNavigate } from 'react-router';
import CardTag from '../CardTag/CardTag';
import S from './CardModal.module.css';
import Swal from 'sweetalert2';
import useReloadStore from '@/lib/ReloadState';

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
  const userProfile = useProfileStore((state) => state.userProfile);
  const cardInfo = useModalVisibleStore((state) => state.cardInfo);
  const navigation = useNavigate();
  const isWriter = useModalVisibleStore((state) => state.isWriter);
  const setReload = useReloadStore((state) => state.setReload);

  const handleClose = () => {
    setNonVisible();
  };

  // 만약 유저가 문제 풀기 페이지로 이동했다면 recent에 저장
  // upsert를 사용해서 내부에 존재한다면 update 처리
  const setRecentView = async () => {
    const now = new Date().toISOString();

    const { error } = await supabase
      .from('recent')
      .upsert(
        {
          solved_user: userProfile!.id,
          solved_question: Number(cardInfo.id),
          recent_time: now,
        },
        { onConflict: 'solved_user, solved_question' }
      )
      .select();

    if (error) console.log(error);
  };

  // 로그인 상태라면 퀴즈 풀기로, 아니라면 로그인 페이지로 이동
  const handleMoveToSolveCard = () => {
    if (isLogin) {
      navigation(`/quiz-play/?problemId=${id}`);
      setRecentView();
    } else {
      navigation('/login');
    }
  };

  const handleDeleteCard = async () => {
    await supabase.from('card').delete().eq('id', Number(cardInfo.id));

    withReactContent(Swal)
      .fire({
        title: (
          <>
            <p style={{ marginBlock: '16px' }}>정상적으로 삭제되었습니다!</p>
            <img src="/images/jellyfish.png" alt="" />
          </>
        ),
        customClass: {
          confirmButton: 'confirmButton',
        },
      })
      .then(() => {
        setNonVisible();
        setReload();
      });
  };

  return (
    <div className={`${S.backdrop} ${!isVisible ? S.close : ''}`}>
      <div className={S.modalContainer}>
        <div className={S.header}>
          <span className={S.alert}>
            {isWriter ? '문제를 삭제하시겠습니까?' : '문제를 푸시겠습니까?'}
          </span>
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
            <span className={S.problemTitle}>{children}</span>
            <div className={S.tagContainer}>
              {tags.map((item) => (
                <CardTag key={item}>{item}</CardTag>
              ))}
            </div>{' '}
            <span className={S.description}>{description}</span>
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
          {isWriter ? (
            <RoundedButton
              color="secondary"
              size="large"
              font="neo"
              onClick={handleDeleteCard}
            >
              삭제
            </RoundedButton>
          ) : (
            <RoundedButton
              color="primary"
              size="large"
              font="neo"
              onClick={handleMoveToSolveCard}
            >
              풀기
            </RoundedButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardModal;
