import { useState } from 'react';
import S from './ModalLayout.module.css';
import RoundedButton from '../RoundedButton/RoundedButton';

interface ModalLayoutProps {
  title: string;
  text: string;
  onClose?: () => void;
}

function ModalLayout({ title, text, onClose }: ModalLayoutProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  return (
    <div className={S.backdrop}>
      <div className={S.modal}>
        <div className={S.header}>
          <p className={S.alert}>{title}</p>
        </div>
        <div className={S.content}>
          <img
            src="/icons/error_red_circle.svg"
            alt="Alert Icon"
            className={S.icon}
          />
          <p className={S.text}>{text}</p>
        </div>
        <RoundedButton
          color="gray"
          size="large"
          font="neo"
          onClick={handleClose}
        >
          확인
        </RoundedButton>
      </div>
    </div>
  );
}

export default ModalLayout;
