// BookMarkState.tsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 상태 변수 타입
interface State {
  bookmarks: number[];
}

// 함수 타입
interface Actions {
  setBookmarks: (bookmarkedData: number[]) => void;
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
      name: '로그인 정보 저장소',
    }
  )
);

export default useBookMarkStore;
