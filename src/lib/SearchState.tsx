import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 상태 변수 타입
interface State {
  searchParam: string;
}

// 함수 타입
interface Actions {
  setSearchParam: (result: string) => void;
}

type Store = State & Actions;

const useSearchStore = create(
  // 새로 고침을 해도 초기화시키지 않기 위한 persist middleware사용
  persist<Store>(
    (set) => ({
      searchParam: '',

      setSearchParam: (result: string) =>
        set(() => ({
          searchParam: result,
        })),
    }),
    {
      name: 'problemInfoStore',
    }
  )
);

export default useSearchStore;
