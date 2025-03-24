import { DummyKey } from './SelectTag';
import S from './SelectTag.module.css';
import { useState } from 'react';

// button태그와 상태와 id 비교와 이벤트를 속성으로 부모로부터 넘겨받기
type TagProps = React.ComponentProps<'button'> & {
  selected: boolean;
  subject: DummyKey;
  onUpdate: (subject: DummyKey, newState: boolean) => void;
};

function Tag({
  selected,
  subject,
  onUpdate,
  children,
  ...restProps
}: TagProps) {
  // 개개인의 상태를 나타내기 위한 상태 선언
  const [pick, setPick] = useState(selected);

  // 클릭 시 상태를 업데이트하는 함수
  const handleChangeState = () => {
    const nextPick = !pick;
    setPick(nextPick);
    onUpdate?.(subject, nextPick);
  };

  // aria-pressed로 현재 클릭된 상태인지 체크
  return (
    <button
      type="button"
      aria-pressed={pick}
      className={S.tagItem}
      onClick={handleChangeState}
      {...restProps}
    >
      #{children}
    </button>
  );
}

export default Tag;
