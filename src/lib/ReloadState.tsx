import { create } from 'zustand';

// 상태 변수 타입
interface State {
  reload: boolean;
}

// 함수 타입
interface Actions {
  setReload: () => void;
}

type Store = State & Actions;

const useReloadStore = create<Store>((set) => ({
  reload: false,

  setReload: () => {
    set((state) => ({
      reload: !state.reload,
    }));
  },
}));

export default useReloadStore;
