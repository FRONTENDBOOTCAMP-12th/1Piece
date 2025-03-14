import { BiTrash } from 'react-icons/bi';
import { IoCheckmark } from 'react-icons/io5';
import TextArea from '@/components/TextArea/TextArea';
import S from './QuizCreate.module.css';

interface QuizCreateProps {
  id: number;
  index: number;
  onDelete: (id: number) => void;
}

function QuizCreate({ id, index, onDelete }: QuizCreateProps) {
  const options = ['정답', '오답', '오답', '오답'];

  return (
    <div className={S.questionContainer}>
      <div className={S.cardHeader}>
        <span className={S.cardNumber}> {index}</span>{' '}
        <button className={S.btnDelete} onClick={() => onDelete(id)}>
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
            />
          </div>
          <div className={S.answer}>
            <label className={S.anwerLabel} htmlFor={`answer-${id}`}>
              선지
            </label>
            <div>
              {options.map((_, idx) => {
                const isFirstOption = idx === 0;
                const placeholderText = isFirstOption
                  ? '정답을 입력해주세요'
                  : '오답을 입력해주세요';

                return (
                  <div key={`radio-${idx}`} className={S.radioQuestion}>
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
          />
        </div>
      </div>
    </div>
  );
}

export default QuizCreate;
