import ModalLayout from './ModalLayout';

function ModalAlertMin() {
  return (
    <div>
      <ModalLayout
        title="문제 생성 실패!"
        text="최소 2개의 카드를 만들어야 합니다!"
        onClose={() => console.log('Modal closed')}
      />
    </div>
  );
}

export default ModalAlertMin;
