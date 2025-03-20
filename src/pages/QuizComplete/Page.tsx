import { useState, useEffect } from 'react';
import { supabase } from '@/lib/SupabaseClient';
import useModalVisibleStore from '@/lib/ProblemModalState';
import useQuizSolvedStore from '@/lib/QuizSolvedState';
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

// 사용자 정보 가져오는 함수
async function fetchUserData() {
  try {
    const { data: user } = await supabase.auth.getUser();
    const { data: userData, error } = await supabase
      .from('users')
      .select('id, nickname, level')
      .eq('auth_uid', user.user!.id)
      .single();
    if (error) throw error;
    return userData;
  } catch (error) {
    console.log(error);
  }
}

function QuizCompletePage() {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false); // 더 불러올 댓글 존재 여부
  const [chunk, setChunk] = useState<number>(1);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const cardInfo = useModalVisibleStore((state) => state.cardInfo);
  const totalQuiz = useQuizSolvedStore((state) => state.totalQuiz);
  const correctQuiz = useQuizSolvedStore((state) => state.correctQuiz);

  // 해당 퀴즈의 댓글 불러오기
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

      // 다음 댓글이 있는지 확인
      setHasMore(data.length === COMMENTS_PER_CHUNK);

      const newData = data.map((item) => ({
        id: `${item.id}`,
        userNickname: item.users.nickname,
        userLevel: item.users.level,
        commentedAt: item.written_at,
        content: item.comment,
      }));

      // 중복 댓글 제거 후 추가
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

  // 좋아요, 북마크 여부 가져오는 함수
  const fetchUserPreferences = async () => {
    const userData = await fetchUserData();
    if (!userData) return;

    try {
      // 좋아요 데이터 불러오기
      const { data: likeData } = await supabase
        .from('like')
        .select('*')
        .eq('like_user', userData.id)
        .eq('like_question', cardInfo.id);

      // 북마크 데이터 불러오기
      const { data: bookmarkData } = await supabase
        .from('bookmark')
        .select('*')
        .eq('bookmark_user', userData.id)
        .eq('bookmark_question', cardInfo.id);

      setIsLiked(likeData && likeData.length > 0);
    } catch (error) {
      console.error('fetchUserPreferences error:', error);
    }
  };

  const handleSetBookmark = async (param: number) => {
    const { data: bookmarkData } = await supabase
      .from('bookmark')
      .select('*')
      .eq('bookmark_question', param);

    const nextIsBookmarked = bookmarkData.length > 0;
    setIsBookmarked(nextIsBookmarked);
  };

  useEffect(() => {
    // fetchComments(chunk);
    // fetchUserPreferences();

    const searchParams = new URL(location.href).searchParams.get('problemId');

    handleSetBookmark(Number(searchParams));

    // return () => {

    // }
  }, [chunk]);

  // 댓글 추가
  const handleAddComment = async (content: string) => {
    const userData = await fetchUserData();
    if (!userData) return;

    try {
      const newComment = {
        id: crypto.randomUUID(), // 임시 ID 생성
        userNickname: userData.nickname,
        userLevel: userData.level,
        commentedAt: new Date().toISOString(),
        content,
      };

      // Supabase에 댓글 추가
      await supabase.from('comment').insert([
        {
          writer_id: userData.id,
          card_id: cardInfo.id,
          comment: content,
          written_at: newComment.commentedAt,
        },
      ]);

      // 상태 업데이트: 화면에 즉시 렌더링 + 새 댓글을 포함한 10개만 유지
      setComments((prevComments) =>
        [newComment, ...prevComments].slice(0, COMMENTS_PER_CHUNK)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // 좋아요
  const handleLike = async () => {
    const userData = await fetchUserData();
    if (!userData) return;

    try {
      if (isLiked) {
        // 좋아요 취소
        await supabase
          .from('like')
          .delete()
          .eq('like_user', userData.id)
          .eq('like_question', cardInfo.id);
      } else {
        // 좋아요 추가
        await supabase.from('like').insert([
          {
            like_user: userData.id,
            like_question: cardInfo.id,
          },
        ]);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error);
    }
  };

  // 북마크
  const handleBookmark = async () => {
    // const userData = await fetchUserData();
    // if (!userData) return;

    // try {
    //   if (isBookmarked) {
    //     // 북마크 취소
    //     await supabase
    //       .from('bookmark')
    //       .delete()
    //       .eq('bookmark_user', userData.id)
    //       .eq('bookmark_question', cardInfo.id);
    //   } else {
    //     // 북마크 추가
    //     await supabase.from('bookmark').insert([
    //       {
    //         bookmark_user: userData.id,
    //         bookmark_question: cardInfo.id,
    //       },
    //     ]);
    //   }
    //   setIsBookmarked(!isBookmarked);
    // } catch (error) {
    //   console.log(error);
    // }

    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className={S.pageContainer}>
      <QuizResult correct={correctQuiz} totalQuestions={totalQuiz} />
      <div className={S.rightSection}>
        <InputBox
          id={cardInfo.id}
          isLiked={isLiked}
          isBookmarked={isBookmarked}
          onLikeUpdate={handleLike}
          onBookmarkUpdate={handleBookmark}
          onAddComment={handleAddComment}
        />
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
