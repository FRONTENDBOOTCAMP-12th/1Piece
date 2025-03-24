import { BiTrash } from 'react-icons/bi';
import S from './Comment.module.css';
import useProfileStore from '@/lib/UserProfileState';

interface CommentProps {
  id?: string;
  userNickname?: string;
  userLevel?: number | null;
  commentedAt?: string;
  content?: string;
  onDelete?: (commentId: string) => void;
}

function Comment({
  id,
  userNickname,
  userLevel,
  commentedAt,
  content,
  onDelete,
}: CommentProps) {
  const userProfile = useProfileStore((state) => state.userProfile);

  const isWriter = userProfile!.nickname === userNickname;

  return (
    <div className={S.container}>
      <div className={S.commentInfo}>
        <div className={S.userInfo}>
          <span className="sr-only">작성자: ${userNickname}</span>
          <span className={S.nickname} aria-hidden="true">
            {userNickname}
          </span>
          <span className="sr-only">레벨: ${userLevel}</span>
          <span
            className={S.level}
            aria-hidden="true"
          >{`LV.${userLevel}`}</span>
        </div>
        <time className={S.time}>{commentedAt}</time>
      </div>
      {isWriter && (
        <button
          className={S.deleteButton}
          onClick={() => onDelete?.(id!)}
          aria-label="댓글 삭제"
        >
          <BiTrash size={24} />
        </button>
      )}
      <p className={S.content}>{content}</p>
    </div>
  );
}

export default Comment;
