import { FaHeart } from 'react-icons/fa6';
import { useState } from 'react';
import { FaRegHeart, FaShareAlt } from 'react-icons/fa';
import S from './InputBox.module.css';
import BookMark from '../../../components/Card/BookMark';
import RoundedButton from '../../../components/RoundedButton/RoundedButton';

interface InputBoxProps {
  isLiked: boolean;
  likeCount: number;
  isBookmarked: boolean;
  onLikeUpdate: () => void;
  onBookmarkUpdate: () => void;
  onAddComment: (text: string) => void;
  id: string;
}

function InputBox({
  isLiked,
  likeCount,
  onLikeUpdate,
  id,
  onAddComment,
}: InputBoxProps) {
  const [content, setContent] = useState<string>('');

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (!content.replace(/\s/g, '').length) return;
    onAddComment(content.trim()); // 앞뒤 공백은 제거, 본문 내 공백은 유지
    setContent('');
  };

  const handleShareClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('주소가 복사되었습니다! 🎉');
    } catch (error) {
      console.error('URL 복사 실패:', error);
      alert('주소 복사에 실패했습니다. 😢');
    }
  };

  return (
    <div className={S.container}>
      <div className={S.iconWrapper}>
        {/* 공유 버튼 */}
        <button
          type="button"
          onClick={handleShareClick}
          aria-label="현재 페이지 주소 복사"
        >
          <FaShareAlt size={20} />
        </button>

        {/* 좋아요 버튼 */}
        <button type="button" className={S.likeButton} onClick={onLikeUpdate}>
          {isLiked ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
          <span aria-label={`좋아요 ${likeCount}개`}>{likeCount}</span>
        </button>

        {/* 북마크 버튼 */}
        <BookMark id={id} />
      </div>

      {/* 댓글 입력 & 버튼 영역 */}
      <div className={S.inputWrapper}>
        <textarea
          className={S.textarea}
          value={content}
          onChange={handleContentChange}
          placeholder="댓글을 입력하세요!"
          aria-label="댓글 입력"
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
