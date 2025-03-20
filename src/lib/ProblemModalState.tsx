import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 카드 정보를 나타내기 위한 타입 지정
export interface CardInfo {
  id: string;
  title: string;
  src: string;
  tags: string[];
  userName: string;
  description: string;
  count: number;
}

// 상태 변수 타입
interface State {
  isVisible: boolean;
  cardInfo: CardInfo;
}

// 함수 타입
interface Actions {
  setVisible: () => void;
  setNonVisible: () => void;
  setCardInfo: (value: CardInfo) => void;
  resetIsVisible: () => void;
}

type Store = State & Actions;

const useModalVisibleStore = create(
  // 새로 고침을 해도 초기화시키지 않기 위한 persist middleware사용
  persist<Store>(
    (set) => ({
      isVisible: false,
      cardInfo: {
        id: '',
        title: '',
        src: '/',
        tags: [''],
        userName: '',
        description: '',
        count: 0,
      },

      // 카드 정보 수정
      setCardInfo: (cardInfo) =>
        set(() => ({
          cardInfo: cardInfo,
        })),

      // 모달의 보이도록 상태 수정
      setVisible: () =>
        set((state) => ({
          isVisible: !state.isVisible,
        })),

      // 모달이 안보이도록 상태 수정
      setNonVisible: () => {
        set((state) => ({
          isVisible: !state.isVisible,
        }));
      },

      // 페이지 이동 시 초기화 되도록 설정하기 위한 함수
      resetIsVisible: () => {
        set(() => ({
          isVisible: false,
        }));
      },
    }),
    {
      name: '문제 정보 저장소',
    }
  )
);

export default useModalVisibleStore;
