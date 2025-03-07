import { ErrorBoundary } from 'react-error-boundary';
import SignUpPage from '@/pages/SignUp/Page';
import FindIdPage from './pages/FindId/Page';
import FindPasswordPage from './pages/FindPassword/Page';
import ProblemListPage from './pages/ProblemList/Page';
import { BrowserRouter, Route, Routes } from 'react-router';
import MainPage from './pages/Main/Page';
import QuestionCreatePage from './pages/QuestionCreate/Page';
import QuestionFixPage from './pages/QuestionFix/Page';
import LogInPage from './pages/LogIn/Page';

function App() {
  return (
    <ErrorBoundary fallback={<div>에러가 발생했습니다</div>}>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route index element={<MainPage />} />
            <Route path="/problem-list" element={<ProblemListPage />} />
            <Route path="/question-create" element={<QuestionCreatePage />} />
            <Route path="/question-fix" element={<QuestionFixPage />} />
          </Route>

          <Route>
            <Route path="/my-page" element={<div>마이페이지입니다</div>} />
            <Route path="/bookmark" element={<div>북마크페이지입니다</div>} />
          </Route>

          <Route>
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/find-id" element={<FindIdPage />} />
            <Route path="/find-pw" element={<FindPasswordPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
