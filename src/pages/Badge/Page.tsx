import MyPageDiary from '@/components/MyPageDiary/MyPageDiary';
import MyPageTab from '@/components/MyPageTab/MyPageTab';
import S from './Page.module.css';

function BadgePage() {
  const tabs = ['달력', '뱃지'];
  const handleTabChange = (tab: string) => {
    console.log(`Selected tab: ${tab}`);
  };

  return (
    <div className={S.MyPageContainer}>
      <MyPageDiary title="B A D G E">뱃지 공간</MyPageDiary>
      <MyPageTab tabs={tabs} onTabChange={handleTabChange} />
    </div>
  );
}

export default BadgePage;
