import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination as SwiperPagination, Grid } from 'swiper/modules';
import ProblemCard from '@/components/ProblemCard/ProblemCard';
import Pagination from '@/components/Pagination/Pagination';
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
  description: string;
}

type CardSwiperProps = React.ComponentProps<'h2'> & {
  data: ProblemCardData[]; // 외부에서 데이터를 받아옴
  loading: boolean; // 로딩 상태를 외부에서 받아옴
};

const ProblemGrid: React.FC<CardSwiperProps> = ({
  children,
  data = [], // 기본값으로 빈 배열 설정
  loading = false, // 기본값으로 false 설정
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
      ) : data.length === 0 ? ( // 데이터가 없을 때 메시지 표시
        <p>표시할 데이터가 없습니다.</p>
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
                  description={item.description}
                >
                  {item.problemTitle}
                </ProblemCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      {data.length > 0 && ( // 데이터가 있을 때만 Pagination 표시
        <Pagination
          totalItems={data.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default ProblemGrid;
