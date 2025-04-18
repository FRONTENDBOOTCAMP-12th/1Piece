import MyPageDiary from '@/components/MyPageDiary/MyPageDiary';
import useModalVisibleStore from '@/lib/ProblemModalState';
import MyPageTab from '@/components/MyPageTab/MyPageTab';
import CardModal from '@/components/CardModal/CardModal';
import { useEffect, useState, useCallback } from 'react';
import CardGrid from '@/components/CardGrid/CardGrid';
import useProfileStore from '@/lib/UserProfileState';
import { supabase } from '@/lib/SupabaseClient';
import useReloadStore from '@/lib/ReloadState';
import S from './Page.module.css';

interface CardData {
  id: string;
  src: string;
  userName: string;
  tags: string[];
  checked: boolean;
  description: string;
  problemTitle: string;
  count: number;
}

function CardWrittenPage() {
  const tabs = [
    { name: '북마크', path: '/bookmark' },
    { name: '최근본', path: '/recent-view' },
    { name: '작성글', path: '/card-written' },
  ];

  const [data, setData] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const cardInfo = useModalVisibleStore((state) => state.cardInfo);
  const userProfile = useProfileStore((state) => state.userProfile);
  const reload = useReloadStore((state) => state.reload);

  const fetchItems = useCallback(async () => {
    try {
      const { data: fetchedData, error } = await supabase
        .from('card')
        .select('*, users(*)')
        .order('created', { ascending: false })
        .eq('writer', userProfile!.id);

      if (error) throw error;

      const newData = fetchedData.map((item) => ({
        id: `${item.id}`,
        src: supabase.storage
          .from('profileImg/userProfile')
          .getPublicUrl(`${item.writer}.png`).data.publicUrl,
        userName: item.users!.nickname,
        tags: Object.values(item.tags!),
        checked: false,
        problemTitle: item.problemTitle,
        description: item.desc,
        count: item.count,
      }));

      setData(newData);
    } catch {
      alert('비정상적인 접근입니다');
    } finally {
      setLoading(false);
    }
  }, [userProfile]);

  useEffect(() => {
    fetchItems();
  }, [reload, fetchItems]);

  return (
    <div className={S.MyPageContainer}>
      <title>Quzelly | 작성한 문제</title>
      <MyPageDiary title="M Y C A R D">
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

export default CardWrittenPage;
