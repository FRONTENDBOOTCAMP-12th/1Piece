import { create } from 'zustand';

interface QuizStore {
  totalQuiz: number;
  correctQuiz: number;
  visibleIndex: number;

  setTotalQuiz: (count: number) => void;
  setCorrectQuiz: () => void;
  setVisibleIndex: () => void;
  setReset: () => void;
}

const useQuizSolvedStore = create<QuizStore>((set) => ({
  totalQuiz: 0,
  correctQuiz: 0,
  visibleIndex: 0,

  setTotalQuiz: (count: number) =>
    set(() => ({
      totalQuiz: count,
    })),

  setCorrectQuiz: () =>
    set((state) => ({
      correctQuiz: state.correctQuiz + 1,
    })),

  setVisibleIndex: () =>
    set((state) => ({
      visibleIndex: state.visibleIndex + 1,
    })),

  setReset: () =>
    set(() => ({
      visibleIndex: 0,
      totalQuiz: 0,
    })),
}));

export default useQuizSolvedStore;
