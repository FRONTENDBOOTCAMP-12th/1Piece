import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Grid } from 'swiper/modules';
import S from './CardSwiper.module.css';
import ProblemCard from '../ProblemCard/ProblemCard';

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
  description: string;
}

type CardSwiperProps = React.ComponentProps<'h2'> & {
  data: ProblemCardData[];
};

const CustomNavigationNext = () => {
  const swiper = useSwiper();

  return (
    <button className={S.btnNext} onClick={() => swiper.slideNext()}>
      <img src="/icons/btn_more_circle_r.svg" alt="Next" />
    </button>
  );
};

const CustomNavigationPrev = () => {
  const swiper = useSwiper();

  return (
    <button className={S.btnPrev} onClick={() => swiper.slidePrev()}>
      <img src="/icons/btn_more_circle_l.svg" alt="Prev" />
    </button>
  );
};

const CardSwiper: React.FC<CardSwiperProps> = ({ data, children }) => {
  return (
    <div className={S.cardSwiperContainer}>
      <div className={S.header}>
        <h2>{children}</h2>
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
          pagination={{ enabled: false }}
          className={S.swiper}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id} className={S.slide}>
              <ProblemCard
                src={item.src}
                userName={item.userName}
                tags={item.tags}
                checked={item.checked}
                id={item.id}
                description={item.description}
              >
                {item.problemTitle}
              </ProblemCard>
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <div className={S.btnMoreCard}>
              <p className={S.MoreCardMessage}>클릭해서 카드 더보기</p>
            </div>
          </SwiperSlide>
          <CustomNavigationNext />
          <CustomNavigationPrev />
        </Swiper>
      </div>
    </div>
  );
};

export default CardSwiper;
