import MyPageDiary from '@/components/MyPageDiary/MyPageDiary';
import Calendar from '@/components/Calendar/Calendar';
import MyPageTab from '@/components/MyPageTab/MyPageTab';
import S from './Page.module.css';

function CalendarPage() {
  const tabs = ['달력', '뱃지'];
  const handleTabChange = (tab: string) => {
    console.log(`Selected tab: ${tab}`);
  };

  return (
    <div className={S.CalendarPageContainer}>
      <MyPageDiary title="C A L E N D A R">
        <Calendar />
      </MyPageDiary>
      <MyPageTab tabs={tabs} onTabChange={handleTabChange} />
    </div>
  );
}

export default CalendarPage;
