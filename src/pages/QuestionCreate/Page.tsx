import React, { useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import TextArea from '@/components/TextArea/TextArea';
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

      {questions.map((question) => (
        <div key={question.id} className={S.questionContainer}>
          <button
            className={S.btnDelete}
            onClick={() => deleteQuestion(question.id)}
          >
            <BiTrash size={24} />
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
                <TextArea
                  name={`question-${question.id}`}
                  placeholder="문제를 입력하세요"
                  height="17rem"
                />
              </div>
              <div className={S.answer}>
                <label
                  className={S.questionLabel}
                  htmlFor={`answer-${question.id}`}
                >
                  선지
                </label>
              </div>
            </div>
            <div className={S.answerDescription}>
              <label
                className={S.questionLabel}
                htmlFor={`explanation-${question.id}`}
              >
                해설
              </label>
              <TextArea
                name={`explanation-${question.id}`}
                placeholder="해설을 입력하세요"
                height="10rem"
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        type="submit"
        label="+"
        color={'dark-gray'}
        className={S.btnAdd}
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
