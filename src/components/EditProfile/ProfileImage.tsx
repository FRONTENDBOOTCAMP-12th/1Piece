import withReactContent from 'sweetalert2-react-content';
import useProfileStore from '@/lib/UserProfileState';
import { supabase } from '@/lib/SupabaseClient';
import { AiFillCamera } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import S from './EditProfile.module.css';
import Swal from 'sweetalert2';

interface ProfileImageProps {
  src: string;
  alt?: string;
  id: string;
  onChange?: (file: File) => void;
}

function ProfileImage({ src, alt = 'Profile image', id }: ProfileImageProps) {
  const [preview, setPreview] = useState(src);
  const setProfileImg = useProfileStore((state) => state.setProfileImg);
  const profileImg = useProfileStore((state) => state.profileImg);

  // 이미지 변경에 실패 시 띄울 경고창
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
      alert('비정상적인 접근입니다');
    }
  };

  // 이미지 업로드 성공 시 띄울 알람
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
      alert('비정상적인 접근입니다');
    }
  };

  // supabase에 파일을 업로드 하는 로직
  const handleFileUpload = async (file: File) => {
    if (!file) {
      return;
    }

    try {
      // 확장자명 분리
      const fileExt = file.name.split('.').pop();

      // 만약 png파일이 아니라면 에러 출력
      if (fileExt !== 'png') {
        throw SyntaxError('확장자오류');
      }

      // 파일 경로 재정의
      const newFileName = `${id}.${fileExt}`;
      const filePath = `${newFileName}`;

      // 동일한 이름 있을 시 덮어쓰기
      const { data, error } = await supabase.storage
        .from('profileImg/userProfile')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      // 통신 성공
      if (data) {
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
        setProfileImg(imageUrl);
        handleCheckUpload();
      }

      if (error) throw error;
    } catch {
      // 통신 실패
      handleAlertUpload();
      alert('비정상적인 접근입니다');
    }
  };

  // 이미지 감지
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleFileUpload(file);
  };

  // 최초 1회는 사용자의 프로필에 따라 렌더링
  useEffect(() => {
    setPreview(profileImg);
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
