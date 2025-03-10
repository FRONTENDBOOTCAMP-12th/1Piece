import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Grid } from 'swiper/modules';
import S from './ProblemListContainer.module.css';
import ProblemCard from '@/components/ProblemCard/ProblemCard';

import 'swiper/css';
import 'swiper/css/navigation'; // 네비게이션 기능 추가 시
import 'swiper/css/pagination'; // 페이지네이션 기능 추가 시
import 'swiper/css/grid';

interface ProblemCardData {
  id: string;
  src: string;
  userName: string;
  tags: string[];
  checked: boolean;
  problemTitle: string;
}

interface CardSwiperProps {
  data: ProblemCardData[];
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

const ProblemListContainer: React.FC<CardSwiperProps> = ({ data }) => {
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

export default ProblemListContainer;
