import S from './RadioQuestion.module.css';
import { IoCheckmark } from 'react-icons/io5';
import TextArea from '@/components/TextArea/TextArea';

interface RadioQuestionProps {
  options: string[];
}

function RadioQuestion({ options }: RadioQuestionProps) {
  return (
    <div>
      {options.map((_, index) => {
        const isFirstOption = index === 0;
        const placeholderText = isFirstOption
          ? '정답을 입력해주세요'
          : '오답을 입력해주세요';

        return (
          <div key={`radio-${index}`} className={S.radioQuestion}>
            <div className={S.radioIconLabel}>
              {isFirstOption ? (
                <IoCheckmark size={60} className={S.radioIconCheck} />
              ) : (
                <IoCheckmark size={60} className={S.radioIcon} />
              )}
            </div>
            <TextArea
              placeholder={placeholderText}
              maxLength={30}
              className={S.textArea}
            />
          </div>
        );
      })}
    </div>
  );
}

export default RadioQuestion;
