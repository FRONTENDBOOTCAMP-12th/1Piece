import MyPageDiary from '@/components/MyPageDiary/MyPageDiary';
import MyPageTab from '@/components/MyPageTab/MyPageTab';
import S from './Page.module.css';

function BadgePage() {
  const tabs = [
    { name: '달력', path: '/calendar' },
    { name: '뱃지', path: '/badge' },
  ];

  return (
    <div className={S.MyPageContainer}>
      <title>Quzelly</title>
      <meta name="description" content="Quzelly 메인 페이지입니다" />
      <meta property="og:title" content="Quzelly" />
      <meta
        property="og:description"
        content="어디든 자유롭게! Quzelly에서 퀴즈를 풀고 탐험하세요."
      />
      <meta
        property="og:image"
        content="https://quzelly.vercel.app/images/main_banner.webp"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://quzelly.vercel.app/" />

      <MyPageDiary title="B A D G E" activeButton={2}>
        뱃지 공간
      </MyPageDiary>
      <MyPageTab tabs={tabs} />
    </div>
  );
}

export default BadgePage;
