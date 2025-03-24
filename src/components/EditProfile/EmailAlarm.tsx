import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import S from './EmailAlarm.module.css';
import dayjs from 'dayjs';

interface EmailAlarmProps {
  time: string | null;
  isChecked: boolean;
  onToggle: () => void;
  onTimeChange: (time: string) => void;
}

function EmailAlarm({
  time,
  isChecked,
  onToggle,
  onTimeChange,
}: EmailAlarmProps) {
  return (
    <div className={S.emailAlarmContainer}>
      <span className={S.emailAlarmLabel}>이메일 알람 설정</span>

      <div className={S.emailAlarmWrapper}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="알람 시간 설정"
            value={isChecked ? dayjs(`2025-01-01T${time ?? '09:00'}`) : null}
            onChange={(newTime) =>
              newTime && onTimeChange(newTime.format('HH:mm'))
            }
            ampm
            className={S.emailAlarmTimePicker}
            disabled={!isChecked} // 체크 해제 시 TimePicker 비활성화
          />
        </LocalizationProvider>

        <label className={S.switch}>
          <input
            role="switch"
            type="checkbox"
            aria-label="알람 설정"
            checked={isChecked}
            onChange={onToggle}
          />
          <span className={S.switchThumb} />
        </label>
      </div>
    </div>
  );
}

export default EmailAlarm;
