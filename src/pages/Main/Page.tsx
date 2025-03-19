import { useEffect, useState } from 'react';
import { supabase } from '@/lib/SupabaseClient';
import useModalVisibleStore from '@/lib/ProblemModalState';
import fetchImg from '@/lib/FetchImg';
import { toast, Toaster } from 'react-hot-toast';

import { useNavigate } from 'react-router';

import CardSwiper from '@/components/CardSwiper/CardSwiper';
import CardModal from '@/components/CardModal/CardModal';
import S from './MainPage.module.css';

interface ProblemCardData {
  id: string;
  src: string;
  userName: string;
  tags: string[];
  checked: boolean;
  description: string;
  problemTitle: string;
  count: number;
}

function MainPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [itemCheck, setItemCheck] = useState<ProblemCardData[]>([]);
  const [itemCreated, setItemCreated] = useState<ProblemCardData[]>([]);
  const cardInfo = useModalVisibleStore((state) => state.cardInfo);
  const navigation = useNavigate();

  const fetchItems = async () => {
    try {
      const { data: dataCheck, error: errorCheck } = await supabase
        .from('card')
        .select('*,users(*)')
        .order('check', { ascending: false })
        .range(0, 6);

      const { data: dataCreated, error: errorCreated } = await supabase
        .from('card')
        .select('*,users(*)')
        .order('created', { ascending: false })
        .range(0, 6);

      const newDataCheck = await Promise.all(
        dataCheck
          ?.map(async (item) => {
            if (!item.users) {
              return null;
            }

            return {
              id: `${item.id}`,
              src: await fetchImg(item.users.id),
              userName: item.users.nickname,
              tags: Object.values(item.tags!),
              checked: false,
              problemTitle: item.problemTitle,
              description: item.desc,
              count: item.count,
            };
          })
          .filter(Boolean) ?? []
      );

      const newDataCreated = await Promise.all(
        dataCreated
          ?.map(async (item) => {
            if (!item.users) {
              return null;
            }

            return {
              id: `${item.id}`,
              src: await fetchImg(item.users.id),
              userName: item.users.nickname,
              tags: Object.values(item.tags!),
              checked: false,
              problemTitle: item.problemTitle,
              description: item.desc,
              count: item.count,
            };
          })
          .filter(Boolean) ?? []
      );

      if (errorCreated) throw errorCreated;
      if (errorCheck) throw errorCheck;

      if (dataCreated) setItemCreated(newDataCreated as ProblemCardData[]);
      if (dataCheck) setItemCheck(newDataCheck as ProblemCardData[]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleMiniBannerClick = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      toast.error('이미 로그인한 상태입니다.');
    } else {
      navigation('/sign-up');
    }
  };

  return (
    <>
      <img
        src="/images/main_banner.jpg"
        alt="큐젤리란"
        className={S.mainBanner}
      />
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <div className={S.mainContainer}>
          <CardSwiper data={itemCreated}>카드 Top 7 </CardSwiper>
          <button
            type="button"
            className={S.miniBannerButton}
            onClick={handleMiniBannerClick}
          />
          <CardSwiper data={itemCheck}>추천 최신 카드 </CardSwiper>
        </div>
      )}
      <CardModal
        src={cardInfo.src}
        tags={cardInfo.tags}
        userName={cardInfo.userName}
        description={cardInfo.description}
      >
        {cardInfo.title}
      </CardModal>
      <Toaster position="bottom-right" />
    </>
  );
}

export default MainPage;
