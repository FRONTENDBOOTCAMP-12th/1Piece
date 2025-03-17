import { useState, useEffect } from 'react';
import { supabase } from '@/lib/SupabaseClient';
import useModalVisibleStore from '@/lib/ProblemModalState';
import QuizResult from '@/components/QuizResult/QuizResult';
import InputBox from './components/InputBox';
import CommentList from '@/components/CommentList/CommentList';
import S from './Page.module.css';

interface CommentData {
  id?: string;
  userNickname: string;
  userLevel: number;
  commentedAt: string;
  content: string;
}

const COMMENTS_PER_CHUNK = 10; // 한 번에 표시할 댓글 수

function QuizCompletePage() {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [chunk, setChunk] = useState<number>(1);
  const cardInfo = useModalVisibleStore((state) => state.cardInfo);

  const fetchComments = async (chunk: number) => {
    try {
      const { data, error } = await supabase
        .from('comment')
        .select('*, users(*)')
        .eq('card_id', cardInfo.id)
        .order('written_at', { ascending: false })
        .range(
          (chunk - 1) * COMMENTS_PER_CHUNK,
          chunk * COMMENTS_PER_CHUNK - 1
        );

      if (!data) throw error;

      setHasMore(data.length === COMMENTS_PER_CHUNK);

      const newData = data.map((item) => ({
        id: `${item.id}`,
        userNickname: item.users.nickname,
        userLevel: item.users.level,
        commentedAt: item.written_at,
        content: item.comment,
      }));

      setComments((prevComments) => [
        ...prevComments.filter(
          (prevItem) => !newData.some((newItem) => newItem.id === prevItem.id)
        ),
        ...newData,
      ]);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    fetchComments(chunk);
  }, [chunk]);

  const handleAddComment = async (content: string) => {
    try {
      const { data: user } = await supabase.auth.getUser();

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, nickname, level')
        .eq('auth_uid', user.user.id)
        .single();

      if (userError) {
        throw userError;
      }

      const { data, error } = await supabase
        .from('comment')
        .insert([
          {
            writer_id: userData.id,
            card_id: cardInfo.id,
            comment: content,
            written_at: new Date().toISOString(),
          },
        ])
        .single();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={S.pageContainer}>
      <QuizResult />
      <div className={S.rightSection}>
        <InputBox onAddComment={handleAddComment} />
        <CommentList
          comments={comments}
          hasMore={hasMore}
          onLoadMore={() => {
            if (hasMore) {
              setChunk((prevChunk) => prevChunk + 1);
            }
          }}
        />
      </div>
    </div>
  );
}

export default QuizCompletePage;
