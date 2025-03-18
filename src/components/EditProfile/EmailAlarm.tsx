import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import S from './EditProfile.module.css';
import dayjs from 'dayjs';

interface EmailAlarmProps {
  initialTime?: string;
  isChecked?: boolean;
  onSave?: (time: string | null, checked: boolean) => void;
}

function EmailAlarm({
  initialTime = '12:00',
  isChecked = false,
  onSave,
}: EmailAlarmProps) {
  const [time, setTime] = useState(dayjs(`2025-01-01T${initialTime}`));
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    if (!onSave) return;

    const handler = setTimeout(() => {
      if (time.format('HH:mm') !== initialTime) {
        onSave(time.format('HH:mm'), checked);
      }
    }, 500); // 0.5초 지연 실행 (debounce 적용)

    return () => clearTimeout(handler); // 이전 실행 취소
  }, [time, checked, onSave, initialTime]);

  const handleTimeChange = (newTime: dayjs.Dayjs | null) => {
    if (newTime) setTime(newTime);
  };

  const handleToggle = () => {
    setChecked((prev) => {
      const newChecked = !prev;
      if (onSave) {
        onSave(newChecked && time ? time.format('HH:mm') : null, newChecked);
      }
      return newChecked;
    });
  };

  return (
    <div className={S.emailAlarmContainer}>
      <span className={S.emailAlarmLabel}>이메일 푸시 알람 설정</span>

      <div className={S.emailAlarmWrapper}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            value={time}
            onChange={handleTimeChange}
            ampm
            className={S.emailAlarmTimePicker}
          />
        </LocalizationProvider>

        <label className={S.switch}>
          <input
            type="checkbox"
            checked={checked}
            onChange={handleToggle}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleToggle();
            }}
            role="switch"
            aria-checked={checked}
            aria-label="이메일 푸시 알람 토글"
          />
          <span className={S.switchThumb} />
        </label>
      </div>
    </div>
  );
}

export default EmailAlarm;
