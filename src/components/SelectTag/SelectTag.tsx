import { useState } from 'react';
import S from './SelectTag.module.css';
import Tag from './Tag';

// 태그 명은 고정된 string값만 사용되므로 type을 다음과 같이 지정
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

// id는 과목명으로, 상태는 boolean값으로 할당
type DummyItemType = {
  id: DummyKey;
  state: boolean;
};

// 임시 데이터
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
  // 상태를 더미데이터를 이용해 생성
  // 이후 zustand로 관리 가능
  const [selectedTag, setSelectedTag] = useState(dummy);

  // 비교할 과목명, 그리고 새롭게 할당할 값을 입력 받음
  const handleUpdateTagList = (subject: DummyKey, newState: boolean) => {
    const nextSelectedTag = selectedTag.map((item) => {
      // 입력받은 subject로 id 값 순회 비교
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
