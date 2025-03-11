import MyPageDiary from '@/components/MyPageDiary/MyPageDiary';
import Calendar from '@/components/Calendar/Calendar';
import MyPageTab from '@/components/MyPageTab/MyPageTab';
import S from './Page.module.css';

function CalendarPage() {
  const tabs = [
    { name: '달력', path: '/calendar' },
    { name: '뱃지', path: '/badge' },
  ];

  return (
    <div className={S.MyPageContainer}>
      <MyPageDiary title="C A L E N D A R">
        <Calendar />
      </MyPageDiary>
      <MyPageTab tabs={tabs} />
    </div>
  );
}

export default CalendarPage;
