import { useState } from 'react';
import S from './Option.module.css';

interface OptionProps {
  content?: string;
}

function Option({ content = '답안' }: OptionProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <button
      className={`${S.button} ${isClicked ? S.clicked : ''}`}
      onClick={handleClick}
    >
      {content}
    </button>
  );
}

export default Option;
