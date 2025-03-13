import Comment from '../Comment/Comment';
import RoundedButton from '../RoundedButton/RoundedButton';
import S from './CommentList.module.css';

interface CommentData {
  id: string;
  userNickname: string;
  userLevel: number;
  commentedAt: string;
  content: string;
}

interface CommentListProps {
  comments: CommentData[];
  hasMore: boolean;
  onLoadMore: () => void;
}

function CommentList({
  comments = [
    // 댓글 더미 데이터
    {
      id: '1',
      userNickname: '루피',
      userLevel: 5,
      commentedAt: '2025-03-12T12:30:00Z',
      content: '쉬운데?',
    },
    {
      id: '2',
      userNickname: '조로',
      userLevel: 3,
      commentedAt: '2025-03-12T13:15:00Z',
      content: '아 3번 틀림',
    },
    {
      id: '3',
      userNickname: '상디',
      userLevel: 1,
      commentedAt: '2025-03-12T14:00:00Z',
      content: '나만 어려움?',
    },
    {
      id: '4',
      userNickname: '나미',
      userLevel: 1,
      commentedAt: '2025-03-12T14:00:00Z',
      content: '5번 풀이 이해안됨 설명좀',
    },
    {
      id: '5',
      userNickname: '쵸파',
      userLevel: 1,
      commentedAt: '2025-03-12T14:00:00Z',
      content: '재밌당~~',
    },
  ],
  hasMore = true,
  onLoadMore,
}: CommentListProps) {
  return (
    <section className={S.container}>
      <h2 className="sr-only">댓글 목록</h2>
      <div className={S.commentList}>
        {/* 댓글이 1개 이상일 경우 렌더링, 그렇지 않을 경우 문구만 표시 */}
        {comments.length > 0 ? (
          comments.map((comment) => <Comment key={comment.id} {...comment} />)
        ) : (
          <p className={S.noComments}>
            아직 댓글이 없습니다. 첫 댓글을 남겨보세요! 😎
          </p>
        )}
      </div>
      {/* 댓글 더보기 버튼 (댓글이 10개 이상이고, 더 불러올 댓글이 있는 경우만 표시) */}
      {hasMore &&
        comments.length >= 3 && ( // 레이아웃 확인을 위해 3 이상으로 설정함 -> 추후 10으로 변경 필요
          <RoundedButton
            color="gray"
            size="large"
            font="neo"
            onClick={onLoadMore}
          >
            댓글 더보기
          </RoundedButton>
        )}
    </section>
  );
}

export default CommentList;
