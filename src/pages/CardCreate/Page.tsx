import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { supabase } from '@/lib/SupabaseClient';

import TextArea from '@/components/TextArea/TextArea';
import SelectTag, { DummyKey } from '@/components/SelectTag/SelectTag';
import Button from '@/components/Button/Button';
import QuizCreate from './QuizCreate/QuizCreate';

import S from './Page.module.css';

function CardCreatePage() {
  const [questions, setQuestions] = useState([
    { id: 1, question: '', options: ['', '', '', ''], explanation: '' },
  ]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<DummyKey[]>([]);
  const navigate = useNavigate();

  const addQuestion = () => {
    if (questions.length < 10) {
      const newId =
        questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1;
      setQuestions([
        ...questions,
        { id: newId, question: '', options: ['', '', '', ''], explanation: '' },
      ]);
    }
  };

  const deleteQuestion = (id: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((question) => question.id !== id));
    }
  };

  const updateQuestion = (
    id: number,
    data: { question: string; options: string[]; explanation: string }
  ) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, ...data } : q)));
  };

  const handleTagSelect = (tags: DummyKey[]) => {
    setSelectedTags(tags);
  };

  const handleSubmit = async () => {
    if (questions.length === 1) {
      toast.error('문제를 2개 이상 만들어 주세요.');
      return;
    }

    if (title.trim() === '' || description.trim() === '') {
      toast.error('카드 입력창을 채워주세요.');
      return;
    }

    const isAllFilled = questions.every(
      (q) =>
        q.question.trim() !== '' &&
        q.options.every((option) => option.trim() !== '') &&
        q.explanation.trim() !== ''
    );

    if (!isAllFilled) {
      toast.error('퀴즈 입력창을 채워주세요.');
      return;
    }

    if (selectedTags.length === 0) {
      toast.error('태그를 선택해주세요.');
      return;
    }

    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError) {
        toast.error('사용자 정보를 가져오는 데 실패했습니다.');
        return;
      }

      const { data: publicUser, error: publicUserError } = await supabase
        .from('users')
        .select('id')
        .eq('auth_uid', userData.user?.id)
        .single();

      if (publicUserError || !publicUser) {
        toast.error('사용자 프로필이 존재하지 않습니다.');
        return;
      }

      const { data: cardData, error: cardError } = await supabase
        .from('card')
        .upsert([
          {
            problemTitle: title,
            count: questions.length,
            desc: description,
            check: Math.floor(Math.random() * 100) + 1,
            created: new Date().toISOString(),
            tags: selectedTags.reduce(
              (acc, tag, index) => {
                acc[`${index + 1}`] = tag;
                return acc;
              },
              {} as Record<string, string>
            ),
            writer: publicUser.id,
          },
        ])
        .select();

      if (cardError) {
        toast.error('카드 저장에 실패했습니다.');
        console.error('카드 저장 오류:', cardError.message);
        return;
      }

      const cardId = cardData[0].id;

      const { error: questionsError } = await supabase.from('questions').insert(
        questions.map((q) => ({
          title: q.question,
          card_id: cardId,
          explanation: q.explanation,
          correct: q.options[0],
          answer: q.options.join(','),
        }))
      );

      if (questionsError) {
        toast.error('퀴즈 저장에 실패했습니다.');
        console.error('퀴즈 저장 오류:', questionsError.message);
        return;
      }

      toast.success('카드가 등록되었습니다.');
      setTimeout(() => {
        navigate('/card-list');
      }, 1000);
    } catch (error) {
      toast.error('카드 저장 중 오류가 발생했습니다.');
      console.error('카드 저장 중 오류:', error);
    }
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
            height="8rem"
          />
        </div>
        <div className={S.tagSelect}>
          <label className={S.label} htmlFor="tagSelect">
            태그 선택
          </label>
          <SelectTag onTagSelect={handleTagSelect} maxTags={3} />
        </div>
      </div>
      {questions.map((question, index) => (
        <QuizCreate
          key={question.id}
          id={question.id}
          index={index + 1}
          onDelete={deleteQuestion}
          onUpdate={updateQuestion}
        />
      ))}
      <Button
        type="submit"
        label="+"
        color={'dark-gray'}
        className={S.btnAdd}
        onClick={addQuestion}
        disabled={questions.length >= 10}
        aria-label="문제 추가"
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
      <Toaster position="bottom-right" />
    </div>
  );
}

export default CardCreatePage;
