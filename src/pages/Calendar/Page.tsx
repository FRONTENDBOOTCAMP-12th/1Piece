import MyPageDiary from '@/components/MyPageDiary/MyPageDiary';
import Calendar from '@/components/Calendar/Calendar';
import MyPageTab from '@/components/MyPageTab/MyPageTab';
import S from './Page.module.css';
import { useEffect, useState } from 'react';
import useCalendarStore from '@/lib/CalendarState';

function CalendarPage() {
  const dateList = useCalendarStore((state) => state.dateList);
  const [attendance, setAttendance] = useState<Date[]>([]);

  console.log(dateList);

  useEffect(() => {
    const newDateList = dateList?.map((item) => {
      const dateArr = item.split('-');
      return new Date(
        Number(dateArr[0]),
        Number(dateArr[1]) - 1,
        Number(dateArr[2])
      );
    });

    console.log(newDateList);
    setAttendance(newDateList);
  }, []);

  const tabs = [
    { name: '달력', path: '/calendar' },
    { name: '뱃지', path: '/badge' },
  ];

  return (
    <div className={S.MyPageContainer}>
      <title>Quzelly | 캘린더</title>
      <MyPageDiary title="C A L E N D A R" activeButton={2}>
        <Calendar markedDates={attendance} />
      </MyPageDiary>
      <MyPageTab tabs={tabs} />
    </div>
  );
}

export default CalendarPage;
