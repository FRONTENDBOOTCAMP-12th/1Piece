import SelectTag from '@/components/SelectTag/SelectTag';
import ProblemListContainer from './components/ProblemListContainer';

import S from './Page.module.css';

function ProblemListPage() {
  return (
    <div className={S.listPageContainer}>
      <h1 className={S.title}>목록</h1>
      <SelectTag />
      <ProblemListContainer />
    </div>
  );
}

export default ProblemListPage;
