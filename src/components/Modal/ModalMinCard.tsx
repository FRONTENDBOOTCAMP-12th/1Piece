import { useState } from 'react';
import S from './ModalMinCard.module.css';

function ModalMinCard() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={S.modal}>
      <div className={S.header}>
        <p className={S.alert}>문제 생성 실패!</p>
      </div>
      <div className={S.content}>
        <img
          src="/icons/error_red_circle.svg"
          alt="Alert Icon"
          className={S.icon}
        />
        <p className={S.text}>최소 2개의 카드를 만들어야 합니다!</p>
        <div className={S.button} onClick={handleClose}>
          확인
        </div>
      </div>
    </div>
  );
}

export default ModalMinCard;
