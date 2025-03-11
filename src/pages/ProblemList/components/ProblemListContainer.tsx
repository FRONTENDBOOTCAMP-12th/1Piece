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
  selectedTags?: string[];
};

const ProblemListContainer: React.FC<CardSwiperProps> = ({
  selectedTags = [],
  children,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ProblemCardData[]>([]);
  const [sortStandard, setSortStandard] = useState<'popular' | 'new'>(
    'popular'
  );
  const itemsPerPage = 12;

  const fetchItems = async (sortBy: 'popular' | 'new') => {
    try {
      let query = supabase.from('card').select('*, users("*")');

      if (sortBy === 'popular') {
        query = query.order('check', { ascending: false });
      } else if (sortBy === 'new') {
        query = query.order('created', { ascending: false });
      }

      const { data: fetchedData, error } = await query;

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

  const handleSortChange = (standard: 'popular' | 'new') => {
    setSortStandard(standard);
    setCurrentPage(1);
    fetchItems(standard);
  };

  useEffect(() => {
    fetchItems(sortStandard);
  }, [selectedTags, sortStandard]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = data.slice(startIndex, endIndex);

  return (
    <div className={S.cardListContainer}>
      <div className={S.sort}>
        <span>총 {data.length}개</span>
        <div>
          <button
            className={`${S.btnSort} ${
              sortStandard === 'popular' ? S.active : ''
            }`}
            onClick={() => handleSortChange('popular')}
          >
            인기순
          </button>{' '}
          |{' '}
          <button
            className={`${S.btnSort} ${sortStandard === 'new' ? S.active : ''}`}
            onClick={() => handleSortChange('new')}
          >
            추천순
          </button>
        </div>
      </div>
      {children && <div className={S.header}>{children}</div>}
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <div className={S.swiperContainer}>
          <Swiper
            modules={[SwiperPagination, Grid]}
            spaceBetween={0}
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
