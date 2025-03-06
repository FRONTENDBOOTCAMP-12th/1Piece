import { IoCheckmark } from 'react-icons/io5';
import S from './RadioIcon.module.css';

function RadioIcon() {
  return (
    <div className={S.radioIcon}>
      <IoCheckmark size={40} />
    </div>
  );
}

export default RadioIcon;
