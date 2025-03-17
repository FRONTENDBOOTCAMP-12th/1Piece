import { supabase } from './SupabaseClient';

// 유저의 이미지 정보를 가져오는 함수(확장자명에 상관 없이)
const fetchImg = async (src: string) => {
  const { data } = await supabase.storage
    .from('profileImg')
    .list('userProfile', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
      search: src,
    });

  if (!data || data.length === 0) {
    return '/dummy/dummy_profile.jpg';
  }

  const publicUrl = supabase.storage
    .from('profileImg/userProfile')
    .getPublicUrl(`${data[0].name}`).data.publicUrl;

  return publicUrl;
};

export default fetchImg;
