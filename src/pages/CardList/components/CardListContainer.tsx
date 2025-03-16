import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/SupabaseClient';
import { Grid, Pagination as SwiperPagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router';

import CardModal from '@/components/CardModal/CardModal';
import Pagination from '@/components/Pagination/Pagination';
import Card from '@/components/Card/Card';
import useModalVisibleStore from '@/lib/ProblemModalState';

import S from './CardListContainer.module.css';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import useSearchStore from '@/lib/SearchState';

export interface CardData {
  id: string;
  src: string;
  userName: string;
  tags: string[];
  checked: boolean;
  description: string;
  problemTitle: string;
  count: number;
}

type CardSwiperProps = React.ComponentProps<'h2'> & {
  selectedTags?: string[];
};

const CardListContainer: React.FC<CardSwiperProps> = ({
  selectedTags = [],
  children,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<CardData[]>([]);
  const [sortStandard, setSortStandard] = useState<'popular' | 'new'>(
    'popular'
  );
  const searchParam = useSearchStore((state) => state.searchParam);
  const setSearchParam = useSearchStore((state) => state.setSearchParam);

  const cardInfo = useModalVisibleStore((state) => state.cardInfo);
  const itemsPerPage = 12;
  const navigate = useNavigate();

  const searchFetchItems = useCallback(async () => {
    console.log(searchParam);
    try {
      const { data: fetchedData, error } = await supabase
        .from('card')
        .select('* , users(*)')
        .ilike('problemTitle', `%${searchParam}%`);

      if (error) throw error;

      const newData = fetchedData.map((item) => ({
        id: `${item.id}`,
        src: supabase.storage
          .from('profileImg/userProfile')
          .getPublicUrl(`${item.users.id}.png`).data.publicUrl,
        userName: item.users.nickname,
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
  }, [searchParam]);

  const fetchItems = useCallback(
    async (sortBy: 'popular' | 'new') => {
      try {
        let query = supabase.from('card').select('*, users(*)');

        if (sortBy === 'popular') {
          query = query.order('check', { ascending: false });
        } else if (sortBy === 'new') {
          query = query.order('created', { ascending: false });
        }

        const { data: fetchedData, error } = await query;

        if (error) throw error;

        const newData = fetchedData.map((item) => ({
          id: `${item.id}`,
          src: supabase.storage
            .from('profileImg/userProfile')
            .getPublicUrl(`${item.users.id}.png`).data.publicUrl,
          userName: item.users.nickname,
          tags: Object.values(item.tags!),
          checked: false,
          problemTitle: item.problemTitle,
          description: item.desc,
          count: item.count,
        }));

        const filteredData = selectedTags.length
          ? newData.filter((item) =>
              item.tags.some((tag) => selectedTags.includes(`${tag}`))
            )
          : newData;

        setData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    },
    [selectedTags]
  );

  const handleSortChange = (standard: 'popular' | 'new') => {
    setSortStandard(standard);
    setCurrentPage(1);
    fetchItems(standard);
  };

  const handleCreateCardClick = () => {
    navigate('/card-create');
  };

  useEffect(() => {
    const search = new URL(location.href).searchParams.get('search');

    if (search) {
      setSearchParam(search);
      searchFetchItems();
    } else {
      fetchItems(sortStandard);
    }
  }, [sortStandard, fetchItems, searchFetchItems, setSearchParam, searchParam]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = data.slice(startIndex, endIndex);
  const isLastPage = currentPage === Math.ceil(data.length / itemsPerPage);

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
            최신순
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
                <Card
                  count={item.count}
                  id={item.id}
                  src={item.src}
                  userName={item.userName}
                  tags={item.tags}
                  checked={item.checked}
                  description={item.description}
                >
                  {item.problemTitle}
                </Card>
              </SwiperSlide>
            ))}

            {isLastPage && (
              <SwiperSlide className={S.slide}>
                <button
                  className={S.btnQuestionCreate}
                  onClick={handleCreateCardClick}
                  aria-label="카드 만들기"
                >
                  <p className={S.questionCreateMessage}>
                    클릭해서 카드 만들기
                  </p>
                </button>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      )}
      <Pagination
        totalItems={data.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
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
};

export default CardListContainer;
