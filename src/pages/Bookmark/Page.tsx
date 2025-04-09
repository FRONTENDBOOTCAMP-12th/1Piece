import MyPageDiary from '@/components/MyPageDiary/MyPageDiary';
import useModalVisibleStore from '@/lib/ProblemModalState';
import MyPageTab from '@/components/MyPageTab/MyPageTab';
import CardModal from '@/components/CardModal/CardModal';
import { useState, useEffect, useCallback } from 'react';
import CardGrid from '@/components/CardGrid/CardGrid';
import useProfileStore from '@/lib/UserProfileState';
import { supabase } from '@/lib/SupabaseClient';
import S from './Page.module.css';

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
  const userProfile = useProfileStore((state) => state.userProfile);

  const fetchItems = useCallback(async () => {
    try {
      const { data: fetchedData, error } = await supabase
        .from('bookmark')
        .select('*,card(*,users(*)), users(*)')
        .eq('bookmark_user', userProfile!.id);

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
  }, [userProfile]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <div className={S.MyPageContainer}>
      <title>Quzelly | 북마크</title>
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
