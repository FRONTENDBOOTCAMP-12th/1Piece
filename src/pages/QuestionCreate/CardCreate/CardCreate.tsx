import { BiTrash } from 'react-icons/bi';
import TextArea from '@/components/TextArea/TextArea';
import RadioQuestion from '@/components/RadioQuestion/RadioQuestion';
import S from './CardCreate.module.css';

interface CardCreateProps {
  id: number;
  index: number;
  onDelete: (id: number) => void;
}

function CardCreate({ id, index, onDelete }: CardCreateProps) {
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
            <RadioQuestion options={['정답', '오답', '오답', '오답']} />
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

export default CardCreate;
