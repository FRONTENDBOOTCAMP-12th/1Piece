import React, { useState, useEffect } from 'react';
import MyPageDiary from '@/components/MyPageDiary/MyPageDiary';
import ProblemGrid from '@/components/ProblemGrid/ProblemGrid';
import MyPageTab from '@/components/MyPageTab/MyPageTab';
import { supabase } from '@/lib/SupabaseClient';
import S from './Page.module.css';

interface ProblemCardData {
  id: string;
  src: string;
  userName: string;
  tags: string[];
  checked: boolean;
  problemTitle: string;
}

function BookmarkPage() {
  const tabs = ['북마크', '최근본', '작성글'];
  const handleTabChange = (tab: string) => {
    console.log(`Selected tab: ${tab}`);
  };

  const [data, setData] = useState<ProblemCardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
        <ProblemGrid data={data} loading={loading} />
      </MyPageDiary>
      <MyPageTab tabs={tabs} onTabChange={handleTabChange} />
    </div>
  );
}

export default BookmarkPage;
