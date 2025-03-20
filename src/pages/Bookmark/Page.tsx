import { useState, useEffect } from 'react';
import MyPageDiary from '@/components/MyPageDiary/MyPageDiary';
import CardGrid from '@/components/CardGrid/CardGrid';
import MyPageTab from '@/components/MyPageTab/MyPageTab';
import { supabase } from '@/lib/SupabaseClient';
import S from './Page.module.css';
import CardModal from '@/components/CardModal/CardModal';
import useModalVisibleStore from '@/lib/ProblemModalState';

interface CardData {
  id: string;
  src: string;
  userName: string;
  tags: string[];
  checked: boolean;
  problemTitle: string;
  description: string;
  count: number;
}

function BookmarkPage() {
  const tabs = [
    { name: '북마크', path: '/bookmark' },
    { name: '최근본', path: '/recent-view' },
    { name: '작성글', path: '/card-written' },
  ];

  const [data, setData] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const cardInfo = useModalVisibleStore((state) => state.cardInfo);

  const fetchItems = async () => {
    try {
      const { data: fetchedData, error } = await supabase
        .from('card')
        .select('*, users(*)')
        .order('created', { ascending: false });

      if (error) throw error;

      const newData = fetchedData.map((item) => ({
        id: `${item.id}`,
        src: supabase.storage
          .from('profileImg/userProfile')
          .getPublicUrl(`${item.users!.id}.png`).data.publicUrl,
        userName: item.users!.nickname,
        tags: Object.values(item.tags!),
        checked: false,
        problemTitle: item.problemTitle,
        description: item.desc,
        count: item.count,
      }));

      setData(newData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className={S.MyPageContainer}>
      <MyPageDiary title="B O O K M A R K">
        <CardGrid data={data} loading={loading} />
      </MyPageDiary>
      <MyPageTab tabs={tabs} />
      <CardModal
        src={cardInfo.src}
        tags={cardInfo.tags}
        userName={cardInfo.userName}
        description={cardInfo.description}
      >
        {cardInfo.title}
      </CardModal>
    </div>
  );
}

export default BookmarkPage;
