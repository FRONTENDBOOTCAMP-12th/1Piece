import { useState } from 'react';
import S from './ModalQuestion.module.css';

function ModalQuestion() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div className={`${S.modal} ${!isVisible ? S.close : ''}`}>
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
          <p className={S.title}>문제 제목</p>
          <p className={S.description}>문제 상세 설명</p>
        </div>
      </div>
      <div className={S.buttons}>
        <div className={S.button} onClick={handleClose}>
          취소
        </div>
        <div className={S.button} onClick={handleClose}>
          풀기
        </div>
      </div>
    </div>
  );
}

export default ModalQuestion;
