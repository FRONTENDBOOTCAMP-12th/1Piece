import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useRef, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import S from './EditProfile.module.css';
import dayjs from 'dayjs';
import useDebounce from '@/pages/EditProfile/components/useDebounce';

interface EmailAlarmProps {
  initialTime?: string;
  isChecked?: boolean;
  onSave: (time: string | null, checked: boolean) => void;
}

function EmailAlarm({
  initialTime = '09:00',
  isChecked = false,
  onSave,
}: EmailAlarmProps) {
  const [time, setTime] = useState(dayjs(`2025-01-01T${initialTime}`));
  const [checked, setChecked] = useState(isChecked);
  const debouncedTime = useDebounce(time.format('HH:mm'), 1000); // 1초 디바운스 적용
  const isMounted = useRef(false); // 첫 렌더링 감지용

  // On 상태에서만 API 호출
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true; // 첫 렌더링 방지
      return;
    }

    if (!checked) console.log('[EmailAlarm] 알람 OFF 상태, API 호출 안 함');
    return; // 알람이 켜진 경우만 실행

    console.log(`[EmailAlarm] 디바운스 후 API 호출: ${debouncedTime}`);
    onSave(debouncedTime, checked);
  }, [debouncedTime, checked, onSave]);

  // 새로운 시간 설정 (중복 렌더링 방지)
  const handleTimeChange = (newTime: dayjs.Dayjs | null) => {
    if (!newTime) return;

    setTime((prevTime) => {
      if (prevTime.isSame(newTime, 'minute')) return prevTime; // 같은 값이면 변경 안 함
      console.log(
        `[handleTimeChange] 새로운 시간 설정됨: ${newTime.format('HH:mm')}`
      );
      return newTime;
    });
  };

  // 알람 ON/OFF 토글
  const handleToggle = () => {
    setChecked((prev) => {
      const newChecked = !prev;
      console.log(`[handleToggle] 알람 토글: ${newChecked}`);

      if (!newChecked) {
        console.log('[handleToggle] 알람 OFF → API 호출');
        onSave(null, false); // OFF 시 null 저장
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
              if (e.key === 'Enter' || e.key === ' ') {
                handleToggle();
              }
            }}
            role="switch"
            aria-checked={checked}
            aria-labelledby="email-alarm-label"
          />
          <span className={S.switchThumb} />
        </label>
      </div>
    </div>
  );
}

export default EmailAlarm;
