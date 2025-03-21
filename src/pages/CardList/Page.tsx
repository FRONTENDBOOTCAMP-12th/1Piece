import { useState } from 'react';
import SelectTag from '@/components/SelectTag/SelectTag';
import CardListContainer from './components/CardListContainer';
import S from './Page.module.css';

function CardListPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagSelect = (tags: string[]) => {
    setSelectedTags(tags);
  };

  return (
    <div className={S.listPageContainer}>
      <title>Quzelly | 문제 목록 페이지</title>
      <meta name="description" content="Quzelly 문제 목록 페이지 입니다" />
      <meta property="og:title" content="Quzelly" />
      <meta
        property="og:description"
        content="어디든 자유롭게! Quzelly에서 퀴즈를 풀고 탐험하세요."
      />
      <meta
        property="og:image"
        content="https://quzelly.vercel.app/images/main_banner.webp"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://quzelly.vercel.app/card-list" />
      <h1 className={S.title}>목록</h1>
      <SelectTag onTagSelect={handleTagSelect} />
      <CardListContainer selectedTags={selectedTags} />
    </div>
  );
}

export default CardListPage;
