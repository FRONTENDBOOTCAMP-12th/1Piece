import { useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa6';
import { FaShareAlt } from 'react-icons/fa';
import S from './InputBox.module.css';
import RoundedButton from '../RoundeButton/RoundedButton';

interface InputBoxProps {
  isLiked: boolean;
  onLikeToggle: () => void;
  likeCount: number;
  onAddComment: (text: string) => void;
}

function InputBox({
  isLiked,
  onLikeToggle,
  likeCount,
  onAddComment,
}: InputBoxProps) {
  const [content, setContent] = useState('');

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (!content.trim()) return;
    onAddComment(content); // 부모로 입력된 댓글 전달
    setContent('');
  };

  return (
    <div className={S.container}>
      {/* 상단 아이콘 */}
      <div className={S.iconWrapper}>
        <FaShareAlt className={S.icon} />
        {/* 북마크 들어갈 자리 */}
        <div className={S.likeWrapper}>
          {isLiked ? (
            <FaHeart
              className={`${S.icon} ${S.liked}`}
              onClick={onLikeToggle}
            /> // 클릭하면 채워진 하트로 변경
          ) : (
            <FaRegHeart className={S.icon} onClick={onLikeToggle} />
          )}
          <span className={S.likeCount}>{likeCount}</span>
        </div>
      </div>

      {/* 댓글 입력 & 버튼 영역 */}
      <div className={S.inputWrapper}>
        <textarea
          className={S.textarea}
          placeholder="댓글을 입력하세요!"
          value={content}
          onChange={handleContentChange}
        />
        <RoundedButton
          color="primary2"
          size="regular"
          onClick={handleCommentSubmit}
        >
          댓글 달기
        </RoundedButton>
      </div>
    </div>
  );
}

export default InputBox;
