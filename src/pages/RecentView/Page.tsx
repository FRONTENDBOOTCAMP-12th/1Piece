import MyPageDiary from '@/components/MyPageDiary/MyPageDiary';
import useModalVisibleStore from '@/lib/ProblemModalState';
import MyPageTab from '@/components/MyPageTab/MyPageTab';
import CardModal from '@/components/CardModal/CardModal';
import CardGrid from '@/components/CardGrid/CardGrid';
import useProfileStore from '@/lib/UserProfileState';
import { supabase } from '@/lib/SupabaseClient';
import { useEffect, useState } from 'react';
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

function RecentViewPage() {
  const tabs = [
    { name: '북마크', path: '/bookmark' },
    { name: '최근본', path: '/recent-view' },
    { name: '작성글', path: '/card-written' },
  ];

  const [data, setData] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const cardInfo = useModalVisibleStore((state) => state.cardInfo);
  const userProfile = useProfileStore((state) => state.userProfile);

  const fetchItems = async () => {
    try {
      const { data: fetchedData, error } = await supabase
        .from('recent')
        .select('*,card(*,users(*)), users(*)')
        .eq('solved_user', userProfile!.id)
        .order('recent_time', { ascending: false });

      if (error) throw error;

      const newData = fetchedData.map((item) => ({
        id: `${item.card.id}`,
        src: supabase.storage
          .from('profileImg/userProfile')
          .getPublicUrl(`${item.card.writer}.png`).data.publicUrl,
        userName: item.card.users!.nickname,
        tags: Object.values(item.card.tags!),
        checked: false,
        problemTitle: item.card.problemTitle,
        description: item.card.desc,
        count: item.card.count,
      }));

      setData(newData);
    } catch {
      alert('비정상적인 접근입니다');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className={S.MyPageContainer}>
      <title>Quzelly | 열람기록</title>
      <MyPageDiary title="R E C E N T V I E W">
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

export default RecentViewPage;
