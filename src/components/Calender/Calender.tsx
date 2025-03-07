import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import S from './Calender.module.css';

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

interface CalenderProps {
  markedDates: Date[];
}

function Calender({ markedDates }: CalenderProps) {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  return (
    <div className={S.calenderContainer}>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        formatDay={(_, date) => date.getDate().toString()}
        minDetail="month"
        maxDetail="month"
        navigationLabel={undefined}
        showNeighboringMonth={false}
        prev2Label={null}
        next2Label={null}
        className="mx-auto w-full text-sm border-b"
        tileContent={({ date }) => {
          const isMarked = markedDates.some((markedDate) =>
            isSameDate(markedDate, date)
          );

          return (
            <div className={S.tileContent}>
              {isMarked && <div className={S.dot} />}
            </div>
          );
        }}
      />
    </div>
  );
}

export default Calender;
