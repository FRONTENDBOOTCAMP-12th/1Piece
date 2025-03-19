import { useEffect, useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import S from './EditProfile.module.css';
import { supabase } from '@/lib/SupabaseClient';
import fetchImg from '@/lib/FetchImg';
import useProfileStore from '@/lib/UserProfileState';

interface ProfileImageProps {
  src: string;
  alt?: string;
  id: string;
  onChange?: (file: File) => void;
}

function ProfileImage({
  src,
  alt = 'Profile image',
  id,
  onChange,
}: ProfileImageProps) {
  const [preview, setPreview] = useState(src);
  const userProfile = useProfileStore((state) => state.userProfile);

  const handleFileUpload = async (file: File) => {
    if (!file) {
      return;
    }

    const fileExt = file.name.split('.').pop();
    const newFileName = `${id}.${fileExt}`;
    const filePath = `${newFileName}`;

    const { data, error } = await supabase.storage
      .from('profileImg/userProfile')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.log(error);
    } else {
      console.log('업로드 성공:', data);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    handleFileUpload(file);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    onChange?.(file);
  };

  const handleSetProfile = async () => {
    const nextPreview = await fetchImg(userProfile!.id);
    setPreview(nextPreview);
  };

  useEffect(() => {
    setPreview(src);
    handleSetProfile();
  }, [src]);

  return (
    <div className={S.profileImageContainer}>
      <label className={S.profileImageButton} title="프로필 사진 수정하기">
        <img src={preview} alt={alt} className={S.profileImage} />
        <input
          type="file"
          accept="image/*"
          className={S.inputImage}
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
