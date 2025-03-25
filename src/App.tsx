import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';
import Common from '@/layout/Common';
import ResetState from './lib/ResetState';

const QuizCompletePage = lazy(() => import('@/pages/QuizComplete/Page'));
const FindPasswordPage = lazy(() => import('@/pages/FindPassword/Page'));
const CardWrittenPage = lazy(() => import('@/pages/CardWritten/Page'));
const EditProfilePage = lazy(() => import('@/pages/EditProfile/Page'));
const CardCreatePage = lazy(() => import('@/pages/CardCreate/Page'));
const RecentViewPage = lazy(() => import('@/pages/RecentView/Page'));
const BookmarkPage = lazy(() => import('@/pages/Bookmark/Page'));
const CalendarPage = lazy(() => import('@/pages/Calendar/Page'));
const CardListPage = lazy(() => import('@/pages/CardList/Page'));
const QuizPlayPage = lazy(() => import('@/pages/QuizPlay/Page'));
const FindIdPage = lazy(() => import('@/pages/FindId/Page'));
const SignUpPage = lazy(() => import('@/pages/SignUp/Page'));
const LogInPage = lazy(() => import('@/pages/LogIn/Page'));
const MainPage = lazy(() => import('@/pages/Main/Page'));

function App() {
  return (
    <ErrorBoundary fallback={<div>에러가 발생했습니다</div>}>
      <Suspense fallback={<div role="status">페이지 로딩 중...</div>}>
        <BrowserRouter>
          <ResetState />
          <Routes>
            <Route element={<Common />}>
              <Route path="/quiz-complete" element={<QuizCompletePage />} />
              <Route path="/find-password" element={<FindPasswordPage />} />
              <Route path="/card-written" element={<CardWrittenPage />} />
              <Route path="/edit-profile" element={<EditProfilePage />} />
              <Route path="/card-create" element={<CardCreatePage />} />
              <Route path="/recent-view" element={<RecentViewPage />} />
              <Route path="/bookmark" element={<BookmarkPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/card-list" element={<CardListPage />} />
              <Route path="/quiz-play" element={<QuizPlayPage />} />
              <Route path="/find-id" element={<FindIdPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/login" element={<LogInPage />} />
              <Route index element={<MainPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
