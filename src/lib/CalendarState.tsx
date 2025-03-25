import { persist } from 'zustand/middleware';
import { create } from 'zustand';

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
      name: '달력 정보 저장소',
    }
  )
);

export default useCalendarStore;
