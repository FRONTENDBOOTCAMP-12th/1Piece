import { User } from '@supabase/supabase-js';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';

// 상태 변수 타입
interface State {
  isLogin: boolean;
  userInfo: User | null;
}

// 함수 타입
interface Actions {
  setUserInfo: (userInfo: User) => void;
  resetUser: () => void;
}

type Store = State & Actions;

const useLoginStore = create(
  persist<Store>(
    (set) => ({
      isLogin: false,
      userInfo: null,

      setUserInfo: (userInfo) =>
        set(() => ({
          isLogin: true,
          userInfo: userInfo,
        })),

      resetUser: () =>
        set(() => ({
          isLogin: false,
          userInfo: null,
        })),
    }),
    {
      name: '로그인 정보 저장소',
    }
  )
);

export default useLoginStore;
