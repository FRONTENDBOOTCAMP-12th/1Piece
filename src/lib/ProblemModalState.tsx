import { create } from 'zustand';

interface State {
  isVisible: boolean;
  userInfo: {
    title: string;
    src: string;
    tags: string[];
    userName: string;
    description: string;
  };
}

interface Actions {
  setVisible: () => void;
  setNonVisible: () => void;
  setUserInfo: () => void;
}

type Store = State & Actions;

const useModalVisibleStore = create<Store>((set) => ({
  isVisible: false,
  userInfo: {
    title: '',
    src: '/',
    tags: [''],
    userName: '',
    description: '',
  },

  setUserInfo: (userInfo) =>
    set(() => ({
      userInfo: userInfo,
    })),

  setVisible: () =>
    set((state) => ({
      isVisible: !state.isVisible,
    })),

  setNonVisible: () => {
    set((state) => ({
      isVisible: !state.isVisible,
    }));
  },
}));

export default useModalVisibleStore;
