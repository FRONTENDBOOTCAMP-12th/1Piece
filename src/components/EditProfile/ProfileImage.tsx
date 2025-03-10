import { useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import S from './EditProfile.module.css';

interface ProfileImageProps {
  src: string;
  alt?: string;
  showUploadButton?: boolean;
  onChange?: (file: File) => void;
}

function ProfileImage({
  src,
  alt = 'Profile image',
  showUploadButton = false,
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
    <div className={S.ProfileImageContainer}>
      <label className={S.ProfileImageButton}>
        <img src={preview} alt={alt} className={S.ProfileImage} />
        {showUploadButton && (
          <>
            <input
              type="file"
              accept="image/*"
              className={S.input}
              onChange={handleFileChange}
            />
            <span className={S.icon}>
              <AiFillCamera size={20} />
            </span>
          </>
        )}
      </label>
    </div>
  );
}

export default ProfileImage;
