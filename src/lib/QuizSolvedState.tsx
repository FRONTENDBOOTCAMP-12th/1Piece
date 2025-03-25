import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface QuizStore {
  totalQuiz: number;
  correctQuiz: number;
  visibleIndex: number;

  setTotalQuiz: (count: number) => void;
  setCorrectQuiz: () => void;
  setVisibleIndex: () => void;
  setReset: () => void;
}

// 문제 풀이에 관련된 상태
const useQuizSolvedStore = create(
  persist<QuizStore>(
    (set) => ({
      totalQuiz: 0,
      correctQuiz: 0,
      visibleIndex: 0,

      // 문제의 총 갯수
      setTotalQuiz: (count: number) =>
        set(() => ({
          totalQuiz: count,
        })),

      // 맞은 문제의 갯수
      setCorrectQuiz: () =>
        set((state) => ({
          correctQuiz: state.correctQuiz + 1,
        })),

      // 현재 보여지는 문제의 index
      setVisibleIndex: () =>
        set((state) => ({
          visibleIndex: state.visibleIndex + 1,
        })),

      // 전체 초기화 상태
      setReset: () =>
        set(() => ({
          visibleIndex: 0,
          correctQuiz: 0,
          totalQuiz: 0,
        })),
    }),
    {
      name: '문제 풀이 완료 저장소',
    }
  )
);

export default useQuizSolvedStore;
