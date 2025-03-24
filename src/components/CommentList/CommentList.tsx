import RoundedButton from '../RoundedButton/RoundedButton';
import Comment from '../Comment/Comment';
import S from './CommentList.module.css';

export interface CommentData {
  id: string;
  userNickname: string;
  userLevel?: number | null;
  commentedAt: string;
  content: string;
}

interface CommentListProps {
  comments: CommentData[];
  hasMore: boolean;
  onDelete?: (commentId: string) => void;
  onLoadMore: () => void;
}

function CommentList({
  comments,
  hasMore = true,
  onDelete,
  onLoadMore,
}: CommentListProps) {
  return (
    <section className={S.container}>
      <h2 className="sr-only">댓글 목록</h2>
      <div className={S.commentList}>
        {/* 댓글이 1개 이상일 경우 렌더링, 그렇지 않을 경우 문구만 표시 */}
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              onDelete={() => onDelete?.(comment.id)}
              {...comment}
            />
          ))
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
