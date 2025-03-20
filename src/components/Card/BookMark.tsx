import { useEffect, useState } from 'react';
import S from './Card.module.css';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import useBookmarkStore from '@/lib/BookmarkState';
import useProfileStore from '@/lib/UserProfileState';
import { supabase } from '@/lib/SupabaseClient';

type BookMarkProps = React.ComponentProps<'button'> & {
  id: string;
};

function BookMark({ id }: BookMarkProps) {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const userProfile = useProfileStore((state) => state.userProfile);
  const [isBookMark, setIsBookMark] = useState(false);
  const setBookmarks = useBookmarkStore((state) => state.setBookmarks);

  const handleSetBookmark = async () => {
    await supabase
      .from('bookmark')
      .insert([
        {
          bookmark_user: userProfile!.id,
          bookmark_question: Number(id),
        },
      ])
      .select();

    const { data: fetchedData } = await supabase
      .from('bookmark')
      .select('*')
      .eq('bookmark_user', userProfile!.id);

    setBookmarks(fetchedData!);
  };

  const handleDeleteBookmark = async () => {
    await supabase
      .from('bookmark')
      .delete()
      .eq('bookmark_user', userProfile!.id)
      .eq('bookmark_question', Number(id));

    const { data: fetchedData } = await supabase
      .from('bookmark')
      .select('*')
      .eq('bookmark_user', userProfile!.id);

    setBookmarks(fetchedData!);
  };

  const handleClickBookMark = (e: React.MouseEvent) => {
    // 버블링 방지
    e.stopPropagation();
    setIsBookMark(!isBookMark);

    if (!isBookMark) {
      handleSetBookmark();
    } else {
      handleDeleteBookmark();
    }
  };

  useEffect(() => {
    const nextIsBookMark = bookmarks?.some((item) => {
      return item.bookmark_question == Number(id);
    });

    setIsBookMark(nextIsBookMark ?? false);
  }, []);

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
