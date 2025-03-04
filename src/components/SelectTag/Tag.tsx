import { useState } from 'react';
import S from './SelectTag.module.css';
import { DummyKey } from './SelectTag';

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
  const [pick, setPick] = useState(selected);

  const handleChangeState = () => {
    const nextPick = !pick;
    setPick(nextPick);
    onUpdate?.(subject, nextPick);
  };

  return (
    <button className={S.tagItem} onClick={handleChangeState} {...restProps}>
      #{children}
    </button>
  );
}

export default Tag;
