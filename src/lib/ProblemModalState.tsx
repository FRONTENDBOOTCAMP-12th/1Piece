import { create } from 'zustand';

export interface UserInfo {
  id: string;
  title: string;
  src: string;
  tags: string[];
  userName: string;
  description: string;
}

interface State {
  isVisible: boolean;
  userInfo: UserInfo;
}

interface Actions {
  setVisible: () => void;
  setNonVisible: () => void;
  setUserInfo: (value: UserInfo) => void;
}

type Store = State & Actions;

const useModalVisibleStore = create<Store>((set) => ({
  isVisible: false,
  userInfo: {
    id: '',
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
