import { useState, useEffect } from 'react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import S from './EditProfile.module.css';
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

  /*  상태 변경될 때만 onSave 실행 */
  useEffect(() => {
    onSave(time.format('HH:mm'), checked);
  }, [time, checked]);

  const handleTimeChange = (newTime: dayjs.Dayjs | null) => {
    if (newTime) setTime(newTime); // 부모 상태를 직접 수정하지 않음
  };

  const handleToggle = () => setChecked((prev) => !prev);

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
