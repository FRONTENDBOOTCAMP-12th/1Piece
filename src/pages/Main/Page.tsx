import CardSwiper from '@/components/CardSwiper/CardSwiper';
import S from './MainPage.module.css';
import { supabase } from '@/lib/SupabaseClient';
import { useEffect, useState } from 'react';

function MainPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [items, setItems] = useState([
    {
      id: 'cardTitle8',
      src: '/dummy/dummy_profile.jpg',
      userName: 'dummy',
      tags: ['국어', '영어', '수학'],
      checked: false,
      problemTitle: 'cardTitle',
    },
  ]);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase.from('card').select('*,users(id)');
      console.log(data);

      const newData = data?.map((item) => ({
        id: item.id,
        src: '/dummy/dummy_profile.jpg',
        userName: 'dummy',
        tags: Object.values(item.tags),
        checked: false,
        problemTitle: item.problemTitle,
      }));

      if (error) throw error;
      if (data) setItems(newData as []);
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
      <CardSwiper data={items}>지난 주 베스트</CardSwiper>
      <hr className={S.line} />
      <CardSwiper data={items}>지난 주 최다 조회수</CardSwiper>
    </>
  );
}

export default MainPage;
