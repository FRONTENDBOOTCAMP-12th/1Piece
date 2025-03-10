import CardSwiper, {
  ProblemCardData,
} from '@/components/CardSwiper/CardSwiper';
import S from './MainPage.module.css';
import { supabase } from '@/lib/SupabaseClient';
import { useEffect, useState } from 'react';

function MainPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [itemCheck, setItemCheck] = useState({});
  const [itemCreated, setItemCreated] = useState({});

  const fetchItems = async () => {
    try {
      const { data: dataCheck, error: errorCheck } = await supabase
        .from('card')
        .select('*,users("*")')
        .order('check', { ascending: false })
        .range(0, 6);

      const { data: dataCreated, error: errorCreated } = await supabase
        .from('card')
        .select('*,users("*")')
        .order('created', { ascending: false })
        .range(0, 6);

      const newDataCheck = dataCheck?.map((item) => ({
        id: item.id,
        src: supabase.storage
          .from('profileImg/userProfile')
          .getPublicUrl(`${item.users.id}.png`).data.publicUrl,
        userName: item.users.nickname,
        tags: Object.values(item.tags!),
        checked: false,
        problemTitle: item.problemTitle,
      }));

      const newDataCreated = dataCreated?.map((item, index) => ({
        id: item.id,
        src: supabase.storage
          .from('profileImg/userProfile')
          .getPublicUrl(`${item.users.id}.png`).data.publicUrl,
        userName: item.users.nickname,
        tags: Object.values(item.tags!),
        checked: false,
        problemTitle: item.problemTitle,
      }));

      if (errorCreated) throw errorCreated;
      if (dataCreated) setItemCreated(newDataCreated as []);

      if (errorCheck) throw errorCheck;
      if (dataCheck) setItemCheck(newDataCheck as []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <img
        src="/dummy/dummy_banner.png"
        alt="큐젤리란"
        className={S.mainBanner}
      />
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <>
          <CardSwiper data={itemCreated as ProblemCardData[]}>
            지난 주 베스트
          </CardSwiper>
          <hr className={S.line} />
          <CardSwiper data={itemCheck as ProblemCardData[]}>
            지난 주 최다 조회수
          </CardSwiper>
        </>
      )}
    </>
  );
}

export default MainPage;
