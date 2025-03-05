import ProblemCardTag from '../ProblemCardTag/ProblemCardTag';
import { useState } from 'react';
import S from './ModalCard.module.css';

function ModalCard() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div className={`${S.backdrop} ${!isVisible ? S.close : ''}`}>
      <div className={S.modalContainer}>
        <div className={S.header}>
          <p className={S.alert}>문제를 푸시겠습니까?</p>
        </div>
        <div className={S.content}>
          <img
            src="/icons/error_red_circle.svg"
            alt="Alert Icon"
            className={S.icon}
          />
          <div className={S.info}>
            {' '}
            <p className={S.title}>문제 제목 최대 10자</p>
            <ProblemCardTag>영어</ProblemCardTag>
            <p className={S.description}>
              문제 설명 최대 30자 혹은 30자 넘으면 ...으로 표시되도록 기능 넣기
            </p>
          </div>
        </div>
        <div className={S.btns}>
          <div className={S.btnExit} onClick={handleClose}>
            취소
          </div>
          <div className={S.btnIn} onClick={handleClose}>
            풀기
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCard;
