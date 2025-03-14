import QuizResult from '@/components/QuizResult/QuizResult';
import InputBox from './components/InputBox';
import CommentList from '@/components/CommentList/CommentList';
import S from './Page.module.css';

function ProblemSolvedPage() {
  return (
    <div className={S.pageContainer}>
      <QuizResult />
      <div className={S.rightSection}>
        <InputBox />
        <CommentList />
      </div>
    </div>
  );
}

export default ProblemSolvedPage;
