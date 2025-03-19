import { create } from 'zustand';
import { supabase } from './SupabaseClient';

interface BookmarkStore {
  bookmarks: Set<number>;
  fetchBookmark: (userId: string) => Promise<void>;
  toggleBookmark: (userId: string, questionId: number) => Promise<void>;
}

const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  bookmarks: new Set(),

  // 북마크 정보 가져오기
  fetchBookmark: async (userId) => {
    try {
      const { data } = await supabase
        .from('bookmark')
        .select('bookmark_question')
        .eq('bookmark_user', userId);

      if (data) {
        set({ bookmarks: new Set(data.map((b) => b.bookmark_question)) });
      }
    } catch (error) {
      console.log(error);
    }
  },

  // 북마크 추가/취소
  toggleBookmark: async (userId, questionId) => {
    const { bookmarks } = get();
    const updatedBookmarks = new Set(bookmarks);

    if (updatedBookmarks.has(questionId)) {
      updatedBookmarks.delete(questionId);
      await supabase
        .from('bookmark')
        .delete()
        .eq('bookmark_user', userId)
        .eq('bookmark_question', questionId);
    } else {
      updatedBookmarks.add(questionId);
      await supabase
        .from('bookmark')
        .insert([{ bookmark_user: userId, bookmark_question: questionId }]);
    }

    set({ bookmarks: updatedBookmarks });
  },
}));

export default useBookmarkStore;
