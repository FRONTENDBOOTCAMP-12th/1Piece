import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination as SwiperPagination, Grid } from 'swiper/modules';
import ProblemCard from '@/components/ProblemCard/ProblemCard';
import Pagination from '@/components/Pagination/Pagination';
import { supabase } from '@/lib/SupabaseClient';
import S from './ProblemGrid.module.css';

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
  selectedTags?: string[];
};

const ProblemGrid: React.FC<CardSwiperProps> = ({
  selectedTags = [],
  children,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ProblemCardData[]>([]);
  const itemsPerPage = 5;

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

      const filteredData = selectedTags.length
        ? newData.filter((item) =>
            item.tags.some((tag) => selectedTags.includes(tag))
          )
        : newData;

      setData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [selectedTags]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = data.slice(startIndex, endIndex);

  return (
    <div className={S.cardListContainer}>
      <div className={S.sort}>
        <span>총 {data.length}개</span>
      </div>
      {children && <div className={S.header}>{children}</div>}
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <div className={S.swiperContainer}>
          <Swiper
            modules={[SwiperPagination, Grid]}
            spaceBetween={0}
            slidesPerView={1}
            grid={{ rows: 5, fill: 'row' }}
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

export default ProblemGrid;
