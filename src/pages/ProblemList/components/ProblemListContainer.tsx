import React, { useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination as SwiperPagination, Grid } from 'swiper/modules';
import S from './ProblemListContainer.module.css';
import ProblemCard from '@/components/ProblemCard/ProblemCard';
import Pagination from '@/components/Pagination/Pagination';

interface ProblemCardData {
  id: string;
  src: string;
  userName: string;
  tags: string[];
  checked: boolean;
  problemTitle: string;
}

interface CardSwiperProps {
  data?: ProblemCardData[];
}

const CustomNavigation = () => {
  const swiper = useSwiper();

  return (
    <div className={S.navigationContainer}>
      <button className={S.btnNext} onClick={() => swiper.slideNext()}>
        <img src="/icons/btn-more-circle.svg" alt="Next" />
      </button>
    </div>
  );
};

const generateDummyData = (): ProblemCardData[] => {
  const dummyData: ProblemCardData[] = [];
  for (let i = 0; i < 100; i++) {
    dummyData.push({
      id: `dummy-${i}`,
      src: '',
      userName: 'No Data',
      tags: [],
      checked: false,
      problemTitle: `Problem ${i + 1}`,
    });
  }
  return dummyData;
};

const ProblemListContainer: React.FC<CardSwiperProps> = ({
  data = generateDummyData(),
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  React.useEffect(() => {
    const existingLinks = document.querySelectorAll('link[data-swiper-style]');

    if (existingLinks.length === 0) {
      const cssUrls = [
        'https://cdn.jsdelivr.net/npm/swiper@11/swiper.min.css',
        'https://cdn.jsdelivr.net/npm/swiper@11/modules/pagination.min.css',
        'https://cdn.jsdelivr.net/npm/swiper@11/modules/grid.min.css',
      ];

      cssUrls.forEach((url) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.setAttribute('data-swiper-style', 'true');
        document.head.appendChild(link);
      });
    }

    return undefined;
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
      <div className={S.swiperContainer}>
        <Swiper
          modules={[SwiperPagination, Grid]}
          spaceBetween={100}
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
          <CustomNavigation />
        </Swiper>
      </div>
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
