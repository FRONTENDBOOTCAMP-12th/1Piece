import S from './Comment.module.css';

interface CommentProps {
  userNickname?: string;
  userLevel?: number;
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
    <article className={S.container}>
      <div className={S.commentInfo}>
        <div className={S.userInfo}>
          <span className={S.nickname} aria-label={`작성자: ${userNickname}`}>
            {userNickname}
          </span>
          <span
            className={S.level}
            aria-label={`레벨: ${userLevel}`}
          >{`LV.${userLevel}`}</span>
        </div>
        <time className={S.time}>{commentedAt}</time>
      </div>
      <p className={S.content}>{content}</p>
    </article>
  );
}

export default Comment;
