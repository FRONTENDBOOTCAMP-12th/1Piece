import { persist } from 'zustand/middleware';
import { create } from 'zustand';

interface Bookmarks {
  bookmark_question: number;
  bookmark_user: string;
  id: number;
}

// 상태 변수 타입
interface State {
  bookmarks: Bookmarks[] | null;
}

// 함수 타입
interface Actions {
  setBookmarks: (bookmarkedData: Bookmarks[]) => void;
}

type Store = State & Actions;

const useBookMarkStore = create(
  persist<Store>(
    (set) => ({
      bookmarks: [],
      setBookmarks: (bookmarkedData) =>
        set(() => ({
          bookmarks: bookmarkedData,
        })),
    }),
    {
      name: '북마크 정보 저장소',
    }
  )
);

export default useBookMarkStore;
