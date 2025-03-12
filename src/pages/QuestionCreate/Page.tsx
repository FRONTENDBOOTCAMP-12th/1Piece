import React, { useState } from 'react';
import TextArea from '@/components/TextArea/TextArea'; // QuestionSet 컴포넌트 import
import SelectTag from '@/components/SelectTag/SelectTag';
import Button from '@/components/Button/Button';
import S from './Page.module.css';

function QuestionCreatePage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [questions, setQuestions] = useState([{ id: 1 }]);

  const handleTagSelect = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const addQuestion = () => {
    const newId =
      questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1;
    setQuestions([...questions, { id: newId }]);
  };

  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  return (
    <div className={S.questionCreateContainer}>
      <h1 className={S.title}>문제 생성</h1>
      <div className={S.settings}>
        <div className={S.questionTitle}>
          <label className={S.label} htmlFor="title">
            제목
          </label>
          <TextArea
            label="문제 세트 제목"
            placeholder="문제 세트 제목을 입력하세요"
          />
        </div>
        <div className={S.description}>
          <label className={S.label} htmlFor="description">
            상세 설명
          </label>
          <TextArea
            label="문제 세트 상세 설명"
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

      {questions.map((question) => (
        <div key={question.id} className={S.questionContainer}>
          <button
            className={S.btnDelete}
            onClick={() => deleteQuestion(question.id)}
          >
            <img src="/public/icons/trash-button.svg" alt="Delete" />
          </button>
          <div className={S.questionInfo}>
            <div className={S.questionAnswer}>
              <div className={S.question}>
                <label
                  className={S.questionLabel}
                  htmlFor={`question-${question.id}`}
                >
                  문제
                </label>
                <TextArea label="문제" placeholder="문제를 입력하세요" />
              </div>
              <div className={S.answer}>
                <label
                  className={S.questionLabel}
                  htmlFor={`answer-${question.id}`}
                >
                  선지
                </label>
                {/* Answer options would go here */}
              </div>
            </div>
            <div className={S.answerDescription}>
              <label
                className={S.questionLabel}
                htmlFor={`explanation-${question.id}`}
              >
                해설
              </label>
              <TextArea label="문제 해설" placeholder="해설을 입력하세요" />
            </div>
          </div>
        </div>
      ))}

      <button
        className={S.btnAdd}
        onClick={addQuestion}
        aria-label="문제 추가"
      />

      <div className={S.btnContainer}>
        <Button label="취소" />
        <Button label="등록" />
      </div>
    </div>
  );
}

export default QuestionCreatePage;
