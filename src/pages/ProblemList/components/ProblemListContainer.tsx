import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Grid } from 'swiper/modules';
import S from './ProblemListContainer.module.css';
import ProblemCard from '@/components/ProblemCard/ProblemCard';

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
  for (let i = 0; i < 7; i++) {
    dummyData.push({
      id: `dummy-${i}`,
      src: '',
      userName: 'No Data',
      tags: [],
      checked: false,
      problemTitle: 'No Data',
    });
  }
  return dummyData;
};

const CardSwiper: React.FC<CardSwiperProps> = ({
  data = generateDummyData(),
}) => {
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

  return (
    <div className={S.cardSwiperContainer}>
      <div className={S.header}>
        <h2>이번 주 베스트 카드</h2>
        <button className={S.btnMoreHeader}>
          <span>더보기</span>
        </button>
      </div>
      <div className={S.swiperContainer}>
        <Swiper
          modules={[Pagination, Grid]}
          spaceBetween={20}
          slidesPerView={2}
          grid={{ rows: 2, fill: 'row' }}
          pagination={{ clickable: true }}
          className={S.swiper}
        >
          {data.map((item) => (
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
          <SwiperSlide className={S.slide}>
            <div className={S.btnMoreCard}>
              <p className={S.MoreCardMessage}>클릭해서 카드 더보기</p>
            </div>
          </SwiperSlide>
          <CustomNavigation />
        </Swiper>
      </div>
    </div>
  );
};

export default CardSwiper;
