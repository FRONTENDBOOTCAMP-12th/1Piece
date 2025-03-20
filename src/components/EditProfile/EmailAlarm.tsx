import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useRef, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import S from './EmailAlarm.module.css';
import dayjs from 'dayjs';

interface EmailAlarmProps {
  initialTime?: string;
  isChecked?: boolean;
  onChange: (time: string | null, checked: boolean) => void; // 부모에서 Supabase로 저장해야 함
}

function EmailAlarm({
  initialTime = '09:00',
  isChecked = false,
  onChange,
}: EmailAlarmProps) {
  const [time, setTime] = useState(() =>
    isChecked ? dayjs(`2025-01-01T${initialTime}`) : null
  );
  const [checked, setChecked] = useState(isChecked);
  const isMounted = useRef(false); // 첫 렌더링 감지용

  // 부모에서 전달된 값이 변경될 때만 초기화
  useEffect(() => {
    setTime(isChecked ? dayjs(`2025-01-01T${initialTime}`) : null);
    setChecked(isChecked);
  }, [initialTime, isChecked]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true; // 첫 렌더링 방지
      return;
    }

    console.log(
      `[EmailAlarm] 변경된 값 전달: 시간 ${checked ? time?.format('HH:mm') : '해제됨'}, 체크 상태 ${checked}`
    );

    //
    if (checked) {
      onChange(time?.format('HH:mm') ?? null, checked);
    } else {
      onChange(null, false);
    }
  }, [checked, time]);

  // 시간 변경 핸들러
  const handleTimeChange = (newTime: dayjs.Dayjs | null) => {
    if (!newTime) return;
    setTime(newTime);
  };

  // 토글이 변경되면 즉시 저장
  const handleToggle = () => {
    setChecked((prev) => {
      const newChecked = !prev;

      // 체크 해제 시 time을 null로 설정
      if (!newChecked) {
        setTime(null);
      }

      return newChecked;
    });
  };

  return (
    <div className={S.emailAlarmContainer}>
      <span className={S.emailAlarmLabel}>이메일 알람 설정</span>

      <div className={S.emailAlarmWrapper}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="알람 시간 설정"
            value={checked ? time : null} // 토글 해제 시 time을 null로 설정
            onChange={handleTimeChange}
            ampm
            className={S.emailAlarmTimePicker}
            disabled={!checked} // 체크 해제 시 TimePicker 비활성화
          />
        </LocalizationProvider>

        <label className={S.switch}>
          <input
            type="checkbox"
            checked={checked}
            onChange={handleToggle}
            role="switch"
            aria-label="알람 설정"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleToggle();
              }
            }}
          />
          <span className={S.switchThumb} />
        </label>
      </div>
    </div>
  );
}

export default EmailAlarm;
