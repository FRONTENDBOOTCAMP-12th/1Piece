import { useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { IoCheckmark } from 'react-icons/io5';

import TextArea from '@/components/TextArea/TextArea';

import S from './QuizCreate.module.css';

interface QuizCreateProps {
  id: number;
  index: number;
  onDelete: (id: number) => void;
  onUpdate: (
    id: number,
    data: { question: string; options: string[]; explanation: string }
  ) => void;
}

function QuizCreate({ id, index, onDelete, onUpdate }: QuizCreateProps) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [explanation, setExplanation] = useState('');

  const handleQuestionChange = (value: string) => {
    setQuestion(value);
    onUpdate(id, { question: value, options, explanation });
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    onUpdate(id, { question, options: newOptions, explanation });
  };

  const handleExplanationChange = (value: string) => {
    setExplanation(value);
    onUpdate(id, { question, options, explanation: value });
  };

  return (
    <div className={S.questionContainer}>
      <div className={S.cardHeader}>
        <span className={S.cardNumber} aria-label="문제 번호">
          {index}
        </span>{' '}
        <button
          className={S.btnDelete}
          onClick={() => onDelete(id)}
          aria-label="삭제"
        >
          <BiTrash size={24} />
        </button>
      </div>
      <div className={S.questionInfo}>
        <div className={S.questionAnswer}>
          <div className={S.question}>
            <label className={S.questionLabel} htmlFor={`question-${id}`}>
              문제
            </label>
            <TextArea
              name={`question-${id}`}
              placeholder="문제를 입력하세요"
              height="19.8rem"
              value={question}
              onChange={handleQuestionChange}
            />
          </div>
          <div className={S.answer}>
            <label className={S.anwerLabel} htmlFor={`answer-${id}`}>
              선지
            </label>
            <div>
              {options.map((option, idx) => {
                const isFirstOption = idx === 0;
                const placeholderText = isFirstOption
                  ? '정답을 입력해주세요'
                  : '오답을 입력해주세요';

                return (
                  <div key={`radio-${idx}`} className={S.radioQuestion}>
                    <label
                      className={S.radioIconLabel}
                      htmlFor={`radio-${idx}-input`}
                    >
                      {isFirstOption ? (
                        <IoCheckmark size={60} className={S.radioIconCheck} />
                      ) : (
                        <IoCheckmark size={60} className={S.radioIcon} />
                      )}
                    </label>
                    <TextArea
                      name={`radio-${idx}-input`}
                      placeholder={placeholderText}
                      maxLength={30}
                      className={S.textArea}
                      value={option}
                      onChange={(value) => handleOptionChange(idx, value)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={S.answerDescription}>
          <label className={S.descriptionLabel} htmlFor={`explanation-${id}`}>
            해설
          </label>
          <TextArea
            name={`explanation-${id}`}
            placeholder="해설을 입력하세요"
            height="9.5rem"
            value={explanation}
            onChange={handleExplanationChange}
          />
        </div>
      </div>
    </div>
  );
}

export default QuizCreate;
