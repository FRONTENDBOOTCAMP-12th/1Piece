import QuestionCreatePage from '@/pages/QuestionCreate/Page';
import { BrowserRouter, Route, Routes } from 'react-router';
import FindPasswordPage from '@/pages/FindPassword/Page';
import ProblemListPage from '@/pages/ProblemList/Page';
import QuestionFixPage from '@/pages/QuestionFix/Page';
import { ErrorBoundary } from 'react-error-boundary';
import SignUpPage from '@/pages/SignUp/Page';
import FindIdPage from '@/pages/FindId/Page';
import LogInPage from '@/pages/LogIn/Page';
import MainPage from '@/pages/Main/Page';
import CalendarPage from '@/pages/Calendar/Page';
import BadgePage from '@/pages/Badge/Page';
import BookmarkPage from '@/pages/Bookmark/Page';
import RecentViewPage from '@/pages/RecentView/Page';
import CardCollectionPage from '@/pages/CardCollection/Page';
import CommonLayout from '@/layout/Page';
import SolveProblem from './pages/SolveProblem/Page';

function App() {
  return (
    <ErrorBoundary fallback={<div>에러가 발생했습니다</div>}>
      <BrowserRouter>
        <Routes>
          <Route element={<CommonLayout />}>
            <Route index element={<MainPage />} />
            <Route path="/problem-list" element={<ProblemListPage />} />
            <Route path="/question-create" element={<QuestionCreatePage />} />
            <Route path="/question-fix" element={<QuestionFixPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/find-id" element={<FindIdPage />} />
            <Route path="/find-pw" element={<FindPasswordPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/badge" element={<BadgePage />} />

            <Route path="/bookmark" element={<BookmarkPage />} />
            <Route path="/recent-view" element={<RecentViewPage />} />
            <Route path="/card-collection" element={<CardCollectionPage />} />
            <Route path="/solve-problem" element={<SolveProblem />} />

            <Route>
              <Route path="/my-page" element={<div>마이페이지입니다</div>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
