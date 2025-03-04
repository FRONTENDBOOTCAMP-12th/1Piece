import { useState } from 'react';
import S from './SelectTag.module.css';
import Tag from './Tag';

export type DummyKey =
  | '국어'
  | '영어'
  | '수학'
  | '사회'
  | '과학'
  | '역사'
  | '음악'
  | '체육'
  | '도덕';

type DummyItemType = {
  id: DummyKey;
  state: boolean;
};

const dummy: DummyItemType[] = [
  { id: '국어', state: false },
  { id: '영어', state: false },
  { id: '수학', state: false },
  { id: '사회', state: false },
  { id: '과학', state: false },
  { id: '역사', state: false },
  { id: '음악', state: false },
  { id: '체육', state: false },
  { id: '도덕', state: false },
];

function SelectTag() {
  const [selectedTag, setSelectedTag] = useState(dummy);

  const handleUpdateTagList = (subject: DummyKey, newState: boolean) => {
    const nextSelectedTag = selectedTag.map((item, idx) => {
      if (item['id'] === subject) {
        return {
          ...item,
          state: newState,
        };
      } else {
        return item;
      }
    });

    setSelectedTag(nextSelectedTag);
  };

  return (
    <div className={S.tagContainer}>
      {selectedTag.map((item) => (
        <Tag
          subject={item['id']}
          selected={item['state']}
          key={item['id']}
          onUpdate={handleUpdateTagList}
        >
          {item['id']}
        </Tag>
      ))}
    </div>
  );
}

export default SelectTag;
