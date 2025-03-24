import S from './Option.module.css';
import { useState } from 'react';

type OptionProps = React.ComponentProps<'button'> & {
  content?: string;
  isCorrect: boolean | null;
  onHit?: (isCorrect: boolean) => void;
};

function Option({ content = '답안', isCorrect, onHit }: OptionProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (correct: boolean) => {
    onHit?.(correct);
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
      onClick={() => handleClick(isCorrect!)}
    >
      {content}
    </button>
  );
}

export default Option;
