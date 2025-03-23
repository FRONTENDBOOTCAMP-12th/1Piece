import { Grid, Pagination as SwiperPagination } from 'swiper/modules';
import Pagination from '@/components/Pagination/Pagination';
import useModalVisibleStore from '@/lib/ProblemModalState';
import { useState, useEffect, useCallback } from 'react';
import CardModal from '@/components/CardModal/CardModal';
import { useNavigate, useLocation } from 'react-router';
import Skeleton from '@/components/Skeleton/Skeleton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { supabase } from '@/lib/SupabaseClient';
import S from './CardListContainer.module.css';
import useSearchStore from '@/lib/SearchState';
import useDebounce from '@/lib/useDebounce';
import Card from '@/components/Card/Card';

// 스와이퍼 관련 CSS 속성 import
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
  // 검색 상태를 감지하기 위한 함수
  const searchParam = useSearchStore((state) => state.searchParam);
  const debouncedSearchParam = useDebounce(searchParam, 500);
  const cardInfo = useModalVisibleStore((state) => state.cardInfo);
  const itemsPerPage = 12;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sort = searchParams.get('sort') as 'popular' | 'new' | null;
    if (sort) {
      setSortStandard(sort);
    }
  }, [location.search]);
  // 검색된 상태가 있을 시 실행할 함수

  const searchFetchItems = useCallback(
    async (sortBy: 'popular' | 'new') => {
      try {
        let query = supabase.from('card').select('*, users(*)');

        if (sortBy === 'popular') {
          query = query.order('check', { ascending: false });
        } else if (sortBy === 'new') {
          query = query.order('created', { ascending: false });
        }
        // card테이블에서 카드 제목에 검색어가 포함된 결과만을 출력

        const { data: fetchedData, error } = await query.ilike(
          'problemTitle',
          `%${debouncedSearchParam}%`
        );
        // 통신 실패 시 오류 발생

        if (error) throw error;
        // 통신된 데이터를 저장
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
        // 체크된 태그에 따라 렌더링 다르게
        const filteredData = selectedTags.length
          ? newData.filter((item) =>
              item.tags.some((tag) => selectedTags.includes(`${tag}`))
            )
          : newData;
        // 렌더링 할 데이터 상태 변경
        setData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    },
    [debouncedSearchParam, selectedTags]
  );

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
            .getPublicUrl(`${item.users!.id}.png`).data.publicUrl,
          userName: item.users!.nickname,
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
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search');

    if (search) {
      searchFetchItems(sortStandard);
    } else {
      setData([]);
    }
  }, [
    sortStandard,
    fetchItems,
    searchFetchItems,
    location.search,
    debouncedSearchParam,
  ]);

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
        <Skeleton row={2} col={6} />
      ) : (
        <div className={S.swiperContainer}>
          <Swiper
            modules={[SwiperPagination, Grid]}
            spaceBetween={0}
            slidesPerView={2}
            grid={{ rows: 6, fill: 'row' }}
            pagination={{ clickable: true }}
            className={S.swiper}
            style={{ width: '83rem' }}
          >
            {data.length === 0 && (
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

            {data.length > 0 && (
              <>
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
              </>
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
