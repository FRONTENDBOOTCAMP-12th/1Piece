import MyPageDiary from '@/components/MyPageDiary/MyPageDiary';
import Calendar from '@/components/Calendar/Calendar';
import useCalendarStore from '@/lib/CalendarState';
import { useEffect, useState } from 'react';
import S from './Page.module.css';

function CalendarPage() {
  const dateList = useCalendarStore((state) => state.dateList);
  const [attendance, setAttendance] = useState<Date[]>([]);

  useEffect(() => {
    const newDateList = dateList?.map((item) => {
      const dateArr = item.split('-');
      return new Date(
        Number(dateArr[0]),
        Number(dateArr[1]) - 1,
        Number(dateArr[2])
      );
    });

    setAttendance(newDateList);
  }, [dateList]);

  return (
    <div className={S.MyPageContainer}>
      <title>Quzelly | 캘린더</title>
      <MyPageDiary title="C A L E N D A R" activeButton={2}>
        <Calendar markedDates={attendance} />
      </MyPageDiary>
    </div>
  );
}

export default CalendarPage;
