import S from './Comment.module.css';

interface CommentProps {
  userNickname?: string;
  userLevel?: number | null;
  commentedAt?: string;
  content?: string;
}

function Comment({
  userNickname,
  userLevel,
  commentedAt,
  content,
}: CommentProps) {
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
      <p className={S.content}>{content}</p>
    </div>
  );
}

export default Comment;
