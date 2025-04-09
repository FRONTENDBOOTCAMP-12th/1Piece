import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import useProfileStore from '@/lib/UserProfileState';
import useBookmarkStore from '@/lib/BookmarkState';
import { supabase } from '@/lib/SupabaseClient';
import S from './Card.module.css';

type BookMarkProps = React.ComponentProps<'button'> & {
  id: string;
};

function BookMark({ id }: BookMarkProps) {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const userProfile = useProfileStore((state) => state.userProfile);
  const setBookmarks = useBookmarkStore((state) => state.setBookmarks);

  const isBookMark =
    bookmarks?.some((item) => {
      return item.bookmark_question == Number(id);
    }) ?? false;

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

    if (!isBookMark) {
      handleSetBookmark();
    } else {
      handleDeleteBookmark();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClickBookMark}
      className={S.bookmarkIcon}
      aria-label="북마크"
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
