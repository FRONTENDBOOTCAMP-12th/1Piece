import React, { useState } from 'react';
import TextArea from '@/components/TextArea/TextArea';
import SelectTag from '@/components/SelectTag/SelectTag';
import Button from '@/components/Button/Button';
import CardCreate from './CardCreate/CardCreate';
import S from './Page.module.css';

function QuestionCreatePage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [questions, setQuestions] = useState([{ id: 1 }]);

  const handleTagSelect = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const addQuestion = () => {
    if (questions.length < 10) {
      const newId =
        questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1;
      setQuestions([...questions, { id: newId }]);
    }
  };

  const deleteQuestion = (id: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((question) => question.id !== id));
    }
  };

  return (
    <div className={S.questionCreateContainer}>
      <h1 className={S.title}>문제 생성</h1>
      <div className={S.settings}>
        <div className={S.questionTitle}>
          <label className={S.label} htmlFor="title">
            제목
          </label>
          <TextArea name="title" placeholder="문제 세트 제목을 입력하세요" />
        </div>
        <div className={S.description}>
          <label className={S.label} htmlFor="description">
            상세 설명
          </label>
          <TextArea
            name="description"
            placeholder="문제 세트 상세 설명을 입력하세요"
          />
        </div>
        <div className={S.tagSelect}>
          <label className={S.label} htmlFor="tagSelect">
            태그 선택
          </label>
          <SelectTag onTagSelect={handleTagSelect} />
        </div>
      </div>

      {questions.map((question, index) => (
        <CardCreate
          key={question.id}
          id={question.id}
          index={index + 1}
          onDelete={deleteQuestion}
        />
      ))}

      <Button
        type="submit"
        label="+"
        color={'dark-gray'}
        className={S.btnAdd}
        onClick={addQuestion}
        disabled={questions.length >= 10}
      />

      <div className={S.btnContainer}>
        <Button
          type="submit"
          label="취소"
          color={'dark-gray'}
          className={S.btns}
        />
        <Button
          type="submit"
          label="등록"
          color={'tertiary'}
          className={S.btns}
        />
      </div>
    </div>
  );
}

export default QuestionCreatePage;
