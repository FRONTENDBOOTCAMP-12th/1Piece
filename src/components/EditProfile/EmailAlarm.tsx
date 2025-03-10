import { useState, useEffect } from 'react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import S from './EmailAlarm.module.css';
import dayjs from 'dayjs';

interface EmailAlarmProps {
  initialTime?: string;
  isChecked?: boolean;
  onSave: (time: string, checked: boolean) => void;
}

function EmailAlarm({
  initialTime = '12:00',
  isChecked = false,
  onSave,
}: EmailAlarmProps) {
  const [time, setTime] = useState(dayjs(`2025-01-01T${initialTime}`));
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    onSave(time.format('HH:mm'), checked);
  }, [checked, time, onSave]);

  const handleTimeChange = (newTime: dayjs.Dayjs | null) => {
    if (newTime) setTime(newTime);
  };

  const handleToggle = () => setChecked((prev) => !prev);

  return (
    <div className={S.EmailAlarmContainer}>
      <span className={S.EmailAlarmLabel}>이메일 푸시 알람 설정</span>

      <div className={S.EmailAlarmWrapper}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            value={time}
            onChange={handleTimeChange}
            ampm
            className={S.EmailAlarmTimePicker}
          />
        </LocalizationProvider>

        <label className={S.Switch}>
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
          <span className={S.SwitchThumb} />
        </label>
      </div>
    </div>
  );
}

export default EmailAlarm;
