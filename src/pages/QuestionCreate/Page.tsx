import React, { useState } from 'react';
import Input from '@/components/Input/Input';
import SelectTag from '@/components/SelectTag/SelectTag';
import RoundedButton from '@/components/RoundedButton/RoundedButton';
import Button from '@/components/Button/Button';
import S from './Page.module.css';

function QuestionCreatePage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagSelect = (tags: string[]) => {
    setSelectedTags(tags);
  };

  return (
    <div className={S.questionCreateContainer}>
      <h1 className={S.title}>문제 생성</h1>
      <div className={S.Settings}>
        <div className={S.title}>
          <span>문제 세트 제목</span>
          <div className={S.inputContainer}>
            <Input
              label="제목"
              name="title"
              type="text"
              placeholder="문제 세트 제목을 입력하세요"
            />
          </div>
        </div>
        <div className={S.description}>
          <span>문제 세트 상세 설명</span>
          <div className={S.inputContainer}>
            <Input
              label="설명"
              name="description"
              type="text"
              placeholder="문제 세트 상세 설명을 입력하세요"
            />
          </div>
        </div>
        <div className={S.tagSelect}>
          <span>문제 세트 태그 선택</span>
          <SelectTag onTagSelect={handleTagSelect} />
        </div>
      </div>

      <div className={S.questionContainer}>
        <div className={S.card}>
          <div className={S.deleteButton}>
            <img src="/path/to/trash-icon.png" alt="Delete" />
          </div>
          <div className={S.question}>
            <span>문제</span>
            <div className={S.inputContainer}>
              <Input
                label="문제"
                name="question"
                type="text"
                placeholder="문제를 입력하세요"
              />
            </div>
          </div>
          <div className={S.answerOption}>
            <span>선지</span>
            {/* Add answer options here */}
          </div>
          <div className={S.answerDescription}>
            <span>해설</span>
            <div className={S.inputContainer}>
              <Input
                label="해설"
                name="explanation"
                type="text"
                placeholder="해설을 입력하세요"
              />
            </div>
          </div>
        </div>
      </div>

      <div className={S.btnContainer}>
        <Button label="등록" />
        <Button label="취소" />
      </div>

      <div className={S.roundedButton}>
        <img src="/path/to/plus-icon.png" alt="Add" />
      </div>
    </div>
  );
}

export default QuestionCreatePage;
