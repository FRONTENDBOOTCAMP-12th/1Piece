import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import S from './Calender.module.css';

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

function Calender() {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

  const formatDay = (_locale: string | undefined, date: Date) => {
    return date.getDate().toString();
  };

  return (
    <div className={S.calenderContainer}>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        calendarType="gregory"
        view="month"
        prev2Label={null}
        next2Label={null}
        showNeighboringMonth={false}
        formatDay={formatDay}
      />
    </div>
  );
}

export default Calender;
