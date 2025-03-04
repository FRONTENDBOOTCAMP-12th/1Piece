import S from './SelectTag.module.css';
import Tag from './Tag';

const dummy: Array<string> = [
  '국어',
  '영어',
  '수학',
  '사회',
  '과학',
  '역사',
  '음악',
  '체육',
  '도덕',
];

function SelectTag() {
  return (
    <div className={S.tagContainer}>
      {dummy.map((index) => {
        return <Tag name={index} />;
      })}
    </div>
  );
}

export default SelectTag;
