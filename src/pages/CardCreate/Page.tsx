import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';

import TextArea from '@/components/TextArea/TextArea';
import SelectTag from '@/components/SelectTag/SelectTag';
import Button from '@/components/Button/Button';
import QuizCreate from './QuizCreate/QuizCreate';

import S from './Page.module.css';

function CardCreatePage() {
  const [questions, setQuestions] = useState([{ id: 1 }]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

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

  const handleSubmit = () => {
    if (questions.length === 1) {
      toast.error('문제를 2개 이상 만들어 주세요.');
      return;
    }

    if (title.trim() === '' || description.trim() === '') {
      toast.error('모든 입력창을 채워주세요.');
      return;
    }

    navigate('/card-list');
  };

  const handleCancel = () => {
    navigate(-1);
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
            name="title"
            placeholder="문제 세트 제목을 입력하세요"
            value={title}
            onChange={(value) => setTitle(value)}
          />
        </div>
        <div className={S.description}>
          <label className={S.label} htmlFor="description">
            상세 설명
          </label>
          <TextArea
            name="description"
            placeholder="문제 세트 상세 설명을 입력하세요"
            value={description}
            onChange={(value) => setDescription(value)}
          />
        </div>
        <div className={S.tagSelect}>
          <label className={S.label} htmlFor="tagSelect">
            태그 선택
          </label>
          <SelectTag maxTags={3} />
        </div>
      </div>
      {questions.map((question, index) => (
        <QuizCreate
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
          type="button"
          label="취소"
          color={'dark-gray'}
          className={S.btnCancel}
          onClick={handleCancel}
        />
        <Button
          type="button"
          label="등록"
          color={'tertiary'}
          className={S.btnSubmit}
          onClick={handleSubmit}
        />
      </div>
      <Toaster />
    </div>
  );
}

export default CardCreatePage;
