import { useState } from 'react';
import S from './Option.module.css';

interface OptionProps {
  content?: string;
  isCorrect?: boolean | null;
}

function Option({ content = '답안', isCorrect }: OptionProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <button
      className={`
        ${S.button}
        ${isClicked ? S.clicked : ''} 
        ${isClicked && isCorrect ? S.correct : ''} 
        ${isClicked && !isCorrect ? S.wrong : ''}
      `}
      onClick={handleClick}
    >
      {content}
    </button>
  );
}

export default Option;
