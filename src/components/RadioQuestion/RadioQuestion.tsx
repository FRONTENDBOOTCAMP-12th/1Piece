import Input from '@/components/Input/Input';
import { useState } from 'react';
import S from './RadioQuestion.module.css';
import RadioIcon from './RadioIcon';
import RadioIconCheck from './RadioIconCheck';

interface RadioQuestionProps {
  options: string[];
}

function RadioQuestion({ options }: RadioQuestionProps) {
  const [answer, setAnswer] = useState<string>('');
  return (
    <div>
      <label className={S.radioLabel} htmlFor="radio-0">
        선지
      </label>
      {options.map((option, index) => {
        const id = `radio-${index}`;
        return (
          <div key={id} className={S.radioQuestion}>
            <input
              id={id}
              type="radio"
              name="correctAnswer"
              checked={answer === option}
              onChange={() => setAnswer(option)}
              className={S.radioHidden}
            />
            <label htmlFor={id} className={S.radioIconLabel}>
              {answer === option ? <RadioIconCheck /> : <RadioIcon />}
            </label>
            <Input
              label={option}
              type="text"
              placeholder="보기를 입력해주세요"
              maxLength={10}
              hiddenLabel
            />
          </div>
        );
      })}
    </div>
  );
}

export default RadioQuestion;
