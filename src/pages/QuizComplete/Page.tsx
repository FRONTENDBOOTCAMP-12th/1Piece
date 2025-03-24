import { CommentData } from '@/components/CommentList/CommentList';
import CommentList from '@/components/CommentList/CommentList';
import QuizResult from '@/components/QuizResult/QuizResult';
import useModalVisibleStore from '@/lib/ProblemModalState';
import useQuizSolvedStore from '@/lib/QuizSolvedState';
import useProfileStore from '@/lib/UserProfileState';
import { supabase } from '@/lib/SupabaseClient';
import InputBox from './components/InputBox';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import S from './Page.module.css';
import useReloadStore from '@/lib/ReloadState';

const COMMENTS_PER_CHUNK = 10; // 한 번에 표시할 댓글 수

function QuizCompletePage() {
  const searchParams = new URL(location.href).searchParams.get('problemId'); // 문제 카드 번호

  const [comments, setComments] = useState<CommentData[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false); // 더 불러올 댓글 존재 여부
  const [chunk, setChunk] = useState<number>(1);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isExploding, setIsExploding] = useState(false);

  const cardInfo = useModalVisibleStore((state) => state.cardInfo);
  const totalQuiz = useQuizSolvedStore((state) => state.totalQuiz);
  const correctQuiz = useQuizSolvedStore((state) => state.correctQuiz);
  const userProfile = useProfileStore((state) => state.userProfile);
  const reload = useReloadStore((state) => state.reload);
  const setReload = useReloadStore((state) => state.setReload);

  // 해당 퀴즈의 댓글 불러오기
  const fetchComments = async (chunk: number) => {
    try {
      const { data, error } = await supabase
        .from('comment')
        .select('*, users(*)')
        .eq('card_id', Number(searchParams))
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
    } catch {
      alert(1);
    }
  };

  // 사용자가 해당 퀴즈에 좋아요를 눌렀는지 확인
  const handleSetLike = async (param: number) => {
    const { data: LikeData } = await supabase
      .from('like')
      .select('*')
      .eq('like_question', param)
      .eq('like_user', userProfile!.id);

    const nextIsLiked = LikeData!.length > 0;
    setIsLiked(nextIsLiked);
  };

  // 사용자가 해당 퀴즈를 북마크 했는지 확인
  const handleSetBookmark = async (param: number) => {
    const { data: bookmarkData } = await supabase
      .from('bookmark')
      .select('*')
      .eq('bookmark_question', param)
      .eq('bookmark_user', userProfile!.id);

    const nextIsBookmarked = bookmarkData!.length > 0;
    setIsBookmarked(nextIsBookmarked);
  };

  // 댓글 추가
  const handleAddComment = async (content: string) => {
    try {
      const newComment = {
        id: crypto.randomUUID(), // 임시 ID 생성
        userNickname: userProfile!.nickname,
        userLevel: userProfile!.level,
        commentedAt: new Date().toISOString(),
        content,
      };

      // Supabase에 댓글 추가
      await supabase.from('comment').insert([
        {
          writer_id: userProfile!.id,
          card_id: Number(searchParams),
          comment: content,
          written_at: newComment.commentedAt,
        },
      ]);
    } catch (error) {
      console.log(error);
    }

    setReload();
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId: string) => {
    try {
      await supabase.from('comment').delete().eq('id', Number(commentId));

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch {
      alert('비정상적인 접근입니다.');
    }
  };

  // 좋아요
  const handleLike = async () => {
    try {
      if (isLiked) {
        // 좋아요 취소
        await supabase
          .from('like')
          .delete()
          .eq('like_user', userProfile!.id)
          .eq('like_question', Number(searchParams));
      } else {
        // 좋아요 추가
        await supabase.from('like').insert([
          {
            like_user: userProfile!.id,
            like_question: Number(searchParams),
          },
        ]);
      }
      setIsLiked(!isLiked);
    } catch {
      alert('비정상적인 접근입니다');
    }
  };

  // 북마크
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    handleSetLike(Number(searchParams));
    handleSetBookmark(Number(searchParams));

    setIsExploding(true);

    const clearId = setTimeout(() => setIsExploding(false), 6000);

    return () => {
      clearTimeout(clearId);
    };
  }, [searchParams]);

  useEffect(() => {
    fetchComments(chunk);
    console.log(1);
  }, [chunk, reload]);

  return (
    <div className={S.pageContainer}>
      <title>Quzelly | 풀이 결과 페이지</title>
      <h1 className="sr-only">퀴즈 풀이 결과</h1>
      {isExploding && (
        <Confetti
          tweenDuration={3000}
          numberOfPieces={250}
          width={1600}
          height={900}
        />
      )}
      <QuizResult
        quizTitle={cardInfo.title}
        correct={correctQuiz}
        totalQuestions={totalQuiz}
      />
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
          onDelete={handleDeleteComment}
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
