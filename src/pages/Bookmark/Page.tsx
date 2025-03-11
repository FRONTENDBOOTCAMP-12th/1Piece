import MyPageDiary from '@/components/MyPageDiary/MyPageDiary';
import ProblemGrid from '@/components/ProblemGrid/ProblemGrid';
import MyPageTab from '@/components/MyPageTab/MyPageTab';
import S from './Page.module.css';

function BookmarkPage() {
  const tabs = ['북마크', '최근본', '작성글'];
  const handleTabChange = (tab: string) => {
    console.log(`Selected tab: ${tab}`);
  };

  return (
    <div className={S.CalendarPageContainer}>
      <MyPageDiary title="B O O K M A R K">
        <ProblemGrid />
      </MyPageDiary>
      <MyPageTab tabs={tabs} onTabChange={handleTabChange} />
    </div>
  );
}

export default BookmarkPage;
