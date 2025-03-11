import { useState } from 'react';
import S from './ProblemCard.module.css';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';

type BookMarkProps = React.ComponentProps<'button'> & {
  checked: boolean;
  onUpdate?: () => void;
};

function BookMark({ checked, onUpdate }: BookMarkProps) {
  const [isBookMark, setIsBookMark] = useState(checked);

  const handleClickBookMark = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIsBookMark = !isBookMark;
    setIsBookMark(nextIsBookMark);
    onUpdate?.();
  };

  return (
    <button
      type="button"
      onClick={handleClickBookMark}
      className={S.bookmarkIcon}
    >
      {isBookMark ? (
        <IoBookmark
          color={`var(--tertiary)`}
          size={32}
          stroke={`var(--black)`}
          strokeWidth={32}
          style={{ boxSizing: 'border-box' }}
        />
      ) : (
        <IoBookmarkOutline size={32} />
      )}
    </button>
  );
}

export default BookMark;
