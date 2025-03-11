import S from './ProblemCardModal.module.css';
import ProblemCardTag from '../ProblemCardTag/ProblemCardTag';
import RoundedButton from '../RoundedButton/RoundedButton';
import useModalVisibleStore from '@/lib/ProblemModalState';
import { NavLink } from 'react-router';

type ProblemCardProps = React.ComponentProps<'img'> &
  React.ComponentProps<'div'> & {
    userName: string;
    tags: string[];
    description: string;
  };

function ProblemCardModal({
  src,
  tags,
  userName,
  children,
  description,
}: ProblemCardProps) {
  const isVisible = useModalVisibleStore((state) => state.isVisible);
  const setNonVisible = useModalVisibleStore((state) => state.setNonVisible);
  const { id } = useModalVisibleStore((state) => state.userInfo);

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
                <ProblemCardTag key={item}>{item}</ProblemCardTag>
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
          <NavLink to={`/solve-problem/?problemId=${id}`}>
            <RoundedButton color="primary" size="large" font="neo">
              풀기
            </RoundedButton>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default ProblemCardModal;
