import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 상태 변수 타입
interface State {
  dateList: string[];
}

// 함수 타입
interface Actions {
  setDateList: (dateList: string[]) => void;
}

type Store = State & Actions;

const useCalendarStore = create(
  persist<Store>(
    (set) => ({
      dateList: [],

      setDateList: (dateList) =>
        set(() => ({
          dateList,
        })),
    }),
    {
      name: '로그인 정보 저장소',
    }
  )
);

export default useCalendarStore;
