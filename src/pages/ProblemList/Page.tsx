import { useState } from 'react';
import SelectTag from '@/components/SelectTag/SelectTag';
import ProblemListContainer from './components/ProblemListContainer';
import S from './Page.module.css';

function ProblemListPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagSelect = (tags: string[]) => {
    setSelectedTags(tags);
  };

  return (
    <div className={S.listPageContainer}>
      <h1 className={S.title}>목록</h1>
      <SelectTag onTagSelect={handleTagSelect} />
      <ProblemListContainer selectedTags={selectedTags} />
    </div>
  );
}

export default ProblemListPage;
