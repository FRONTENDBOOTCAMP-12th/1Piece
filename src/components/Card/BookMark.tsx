import { useEffect, useState } from 'react';
import S from './Card.module.css';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import useBookmarkStore from '@/lib/BookmarkState';

type BookMarkProps = React.ComponentProps<'button'> & {
  userId: string;
  questionId: number;
};

function BookMark({ userId, questionId }: BookMarkProps) {
  const { bookmarks, toggleBookmark } = useBookmarkStore();
  const [isBookMark, setIsBookMark] = useState(false);

  useEffect(() => {
    setIsBookMark(bookmarks.has(questionId));
  }, [bookmarks, questionId]);

  const handleClickBookMark = (e: React.MouseEvent) => {
    // 버블링 방지
    e.stopPropagation();
    toggleBookmark(userId, questionId);
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
