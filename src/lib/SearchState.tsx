import { persist } from 'zustand/middleware';
import { create } from 'zustand';

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
      name: '검색 정보 저장소',
    }
  )
);

export default useSearchStore;
