import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination as SwiperPagination, Grid } from 'swiper/modules';
import S from './ProblemListContainer.module.css';
import ProblemCard from '@/components/ProblemCard/ProblemCard';
import Pagination from '@/components/Pagination/Pagination';
import { supabase } from '@/lib/SupabaseClient';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';

export interface ProblemCardData {
  id: string;
  src: string;
  userName: string;
  tags: string[];
  checked: boolean;
  problemTitle: string;
}

type CardSwiperProps = React.ComponentProps<'h2'> & {
  data?: ProblemCardData[];
};

const ProblemListContainer: React.FC<CardSwiperProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ProblemCardData[]>([]);
  const itemsPerPage = 12;

  const fetchItems = async () => {
    try {
      // 데이터를 가져오는 로직
      const { data: fetchedData, error } = await supabase
        .from('card')
        .select('*, users("*")')
        .order('created', { ascending: false });

      if (error) throw error;

      // ProblemCard에 사용되는 데이터 형식에 맞춰서 데이터 가공
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = data.slice(startIndex, endIndex);

  return (
    <div className={S.cardListContainer}>
      <div className={S.sort}>
        <span>총 {data.length}개</span>
        <div>인기순 | 추천순</div>
      </div>
      {children && <div className={S.header}>{children}</div>}
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <div className={S.swiperContainer}>
          <Swiper
            modules={[SwiperPagination, Grid]}
            spaceBetween={20}
            slidesPerView={2}
            grid={{ rows: 6, fill: 'row' }}
            pagination={{ clickable: true }}
            className={S.swiper}
          >
            {currentPageData.map((item) => (
              <SwiperSlide key={item.id} className={S.slide}>
                <ProblemCard
                  src={item.src}
                  userName={item.userName}
                  tags={item.tags}
                  checked={item.checked}
                >
                  {item.problemTitle}
                </ProblemCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      <Pagination
        totalItems={data.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProblemListContainer;
