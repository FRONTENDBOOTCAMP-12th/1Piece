import MyPageDiary from '@/components/MyPageDiary/MyPageDiary';
import Calendar from '@/components/Calendar/Calendar';
import MyPageTab from '@/components/MyPageTab/MyPageTab';
import S from './Page.module.css';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/SupabaseClient';
import useLoginStore from '@/lib/LoginState';

function CalendarPage() {
  const userInfo = useLoginStore((state) => state.userInfo);
  const [attendanceDate, setAttendanceDate] = useState<Date[]>([]);
  const newAttendanceDate: Date[] = [];

  const fetchAttendance = async () => {
    const { data } = await supabase
      .from('attendance')
      .select('*')
      .eq('user_id', userInfo!.id);

    console.log(new Date(2025, 1, 25));
    data?.map((item) => {
      const dateArr = item.attendance_date.split('-');
      const date = new Date(
        Number(dateArr[0]),
        Number(dateArr[1]) - 1,
        Number(dateArr[2])
      );

      newAttendanceDate.push(date);
    });

    setAttendanceDate(newAttendanceDate);
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const tabs = [
    { name: '달력', path: '/calendar' },
    { name: '뱃지', path: '/badge' },
  ];

  return (
    <div className={S.MyPageContainer}>
      <MyPageDiary title="C A L E N D A R" activeButton={2}>
       <Calendar markedDates={attendanceDate} />
      </MyPageDiary>
      <MyPageTab tabs={tabs} />
    </div>
  );
}

export default CalendarPage;
