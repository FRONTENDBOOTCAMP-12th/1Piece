import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';
import Common from '@/layout/Common';

const BadgePage = lazy(() => import('@/pages/Badge/Page'));
const BookmarkPage = lazy(() => import('@/pages/Bookmark/Page'));
const CalendarPage = lazy(() => import('@/pages/Calendar/Page'));
const CardCreatePage = lazy(() => import('@/pages/CardCreate/Page'));
const CardEditPage = lazy(() => import('@/pages/CardEdit/Page'));
const CardListPage = lazy(() => import('@/pages/CardList/Page'));
const CardWrittenPage = lazy(() => import('@/pages/CardWritten/Page'));
const EditProfilePage = lazy(() => import('@/pages/EditProfile/Page'));
const FindIdPage = lazy(() => import('@/pages/FindId/Page'));
const FindPasswordPage = lazy(() => import('@/pages/FindPassword/Page'));
const LogInPage = lazy(() => import('@/pages/LogIn/Page'));
const MainPage = lazy(() => import('@/pages/Main/Page'));
const QuizCompletePage = lazy(() => import('@/pages/QuizComplete/Page'));
const QuizPlayPage = lazy(() => import('@/pages/QuizPlay/Page'));
const RecentViewPage = lazy(() => import('@/pages/RecentView/Page'));
const SignUpPage = lazy(() => import('@/pages/SignUp/Page'));

function App() {
  return (
    <ErrorBoundary fallback={<div>에러가 발생했습니다</div>}>
      <Suspense fallback={<div role="status">페이지 로딩 중...</div>}>
        <BrowserRouter>
          <Routes>
            <Route element={<Common />}>
              <Route index element={<MainPage />} />
              <Route path="/badge" element={<BadgePage />} />
              <Route path="/bookmark" element={<BookmarkPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/card-create" element={<CardCreatePage />} />
              <Route path="/card-edit" element={<CardEditPage />} />
              <Route path="/card-list" element={<CardListPage />} />
              <Route path="/card-written" element={<CardWrittenPage />} />
              <Route path="/edit-profile" element={<EditProfilePage />} />
              <Route path="/find-id" element={<FindIdPage />} />
              <Route path="/find-password" element={<FindPasswordPage />} />
              <Route path="/login" element={<LogInPage />} />
              <Route path="/quiz-complete" element={<QuizCompletePage />} />
              <Route path="/quiz-play" element={<QuizPlayPage />} />
              <Route path="/recent-view" element={<RecentViewPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
