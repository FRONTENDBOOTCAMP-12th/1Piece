import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Json } from './schema';

interface UserProfileProps {
  alarm: string | null;
  auth_uid: string;
  badge: Json | null;
  email: string;
  id: string;
  level: number | null;
  nickname: string;
  user_id: string;
}

// 상태 변수 타입
interface State {
  userProfile: UserProfileProps | null;
  profileImg: string;
}

// 함수 타입
interface Actions {
  setUserProfile: (userData: UserProfileProps) => void;
  setProfileImg: (src: string) => void;
  resetUserProfile: () => void;
}

type Store = State & Actions;

const useProfileStore = create(
  persist<Store>(
    (set) => ({
      userProfile: null,
      profileImg: 'dummy/dummy_profile.png',

      setUserProfile: (userData) =>
        set(() => ({
          userProfile: userData,
        })),

      setProfileImg: (src) =>
        set(() => ({
          profileImg: src,
        })),

      resetUserProfile: () =>
        set(() => ({
          userProfile: null,
          profileImg: 'dummy/dummy_profile.png',
        })),
    }),
    {
      name: '프로필 정보 저장소',
    }
  )
);

export default useProfileStore;
