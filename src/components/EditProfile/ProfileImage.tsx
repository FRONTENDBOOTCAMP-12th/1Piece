import { useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import S from './EditProfile.module.css';

interface ProfileImageProps {
  src: string;
  alt?: string;
  onChange?: (file: File) => void;
}

function ProfileImage({
  src,
  alt = 'Profile image',
  onChange,
}: ProfileImageProps) {
  const [preview, setPreview] = useState(src);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    onChange?.(file);
  };

  return (
    <div className={S.profileImageContainer}>
      <label className={S.profileImageButton} title="프로필 사진 수정하기">
        <img src={preview} alt={alt} className={S.profileImage} />
        <input
          type="file"
          accept="image/*"
          className={S.input}
          onChange={handleFileChange}
        />
        <span className={S.icon}>
          <AiFillCamera size={20} />
        </span>
      </label>
    </div>
  );
}

export default ProfileImage;
