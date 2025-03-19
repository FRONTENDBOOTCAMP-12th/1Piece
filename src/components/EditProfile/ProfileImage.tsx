import { useEffect, useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import S from './EditProfile.module.css';
import { supabase } from '@/lib/SupabaseClient';
import fetchImg from '@/lib/FetchImg';
import useProfileStore from '@/lib/UserProfileState';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

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

  const handleAlertUpload = () => {
    try {
      withReactContent(Swal).fire({
        title: (
          <>
            <p style={{ marginBlock: '16px' }}>
              확장자명(png)와 파일 크기(2MB)를 확인해주세요
            </p>
            <img src="/images/jellyfish.png" alt="" />
          </>
        ),
        confirmButtonText: '확인',
        customClass: {
          confirmButton: 'confirmButton',
          title: 'alertTitle',
        },
      });
    } catch {
      console.log('비정상적인 접근입니다');
    }
  };

  const handleCheckUpload = () => {
    try {
      withReactContent(Swal).fire({
        title: (
          <>
            <p style={{ marginBlock: '16px' }}>
              프로필 이미지가 정상적으로 변경되었습니다!
            </p>
            <img src="/images/jellyfish.png" alt="" />
          </>
        ),
        confirmButtonText: '확인',
        customClass: {
          confirmButton: 'confirmButton',
          title: 'alertTitle',
        },
      });
    } catch {
      console.log('비정상적인 접근입니다');
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) {
      return;
    }

    try {
      const fileExt = file.name.split('.').pop();

      if (fileExt !== 'png') {
        console.log(fileExt);
        throw SyntaxError('확장자오류');
      }

      const newFileName = `${id}.${fileExt}`;
      const filePath = `${newFileName}`;

      const { data, error } = await supabase.storage
        .from('profileImg/userProfile')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (data) {
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
      }

      if (data) {
        handleCheckUpload();
      }

      if (error) throw error;
    } catch (err) {
      handleAlertUpload();
      console.log(err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    handleFileUpload(file);

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
