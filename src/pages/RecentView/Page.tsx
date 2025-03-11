import React, { useState, useEffect } from 'react';
import MyPageDiary from '@/components/MyPageDiary/MyPageDiary';
import ProblemGrid from '@/components/ProblemGrid/ProblemGrid';
import MyPageTab from '@/components/MyPageTab/MyPageTab';
import { supabase } from '@/lib/SupabaseClient';
import S from './Page.module.css';
import ProblemCardModal from '@/components/ProblemCardModal/ProblemCardModal';
import useModalVisibleStore from '@/lib/ProblemModalState';

interface ProblemCardData {
  id: string;
  src: string;
  userName: string;
  tags: string[];
  checked: boolean;
  description: string;
  problemTitle: string;
}

function RecentViewPage() {
  const tabs = [
    { name: '북마크', path: '/bookmark' },
    { name: '최근본', path: '/recent-view' },
    { name: '작성글', path: '/card-collection' },
  ];

  const [data, setData] = useState<ProblemCardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const cardInfo = useModalVisibleStore((state) => state.cardInfo);

  const fetchItems = async () => {
    try {
      const { data: fetchedData, error } = await supabase
        .from('card')
        .select('*, users("*")')
        .order('created', { ascending: false });

      if (error) throw error;

      const newData = fetchedData.map((item) => ({
        id: item.id,
        src: supabase.storage
          .from('profileImg/userProfile')
          .getPublicUrl(`${item.users.id}.png`).data.publicUrl,
        userName: item.users.nickname,
        tags: Object.values(item.tags!),
        checked: false,
        problemTitle: item.problemTitle,
        description: item.desc,
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
      <MyPageDiary title="R E C E N T V I E W">
        <ProblemGrid data={data} loading={loading} />
      </MyPageDiary>
      <MyPageTab tabs={tabs} />
      <ProblemCardModal
        src={cardInfo.src}
        tags={cardInfo.tags}
        userName={cardInfo.userName}
        description={cardInfo.description}
      >
        {cardInfo.title}
      </ProblemCardModal>
    </div>
  );
}

export default RecentViewPage;
