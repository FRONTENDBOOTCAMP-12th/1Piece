import React from 'react';
import ProblemCard from '../ProblemCard/ProblemCard';
import S from './CardSwiper.module.css';

interface CardSwiperProps {
  data: {
    id: string;
    src: string;
    userName: string;
    tags: string[];
    checked: boolean;
    problemTitle: string;
  }[];
}

function CardSwiper({ data }: CardSwiperProps) {
  const recommendCard = data.slice(0, 4);

  return (
    <div className={S.CardSwipderContainer}>
      <div className={S.header}>
        <h2>이번 주 베스트 카드</h2>
        <button className={S.btnMoreHeader}>
          <span>더보기</span>
        </button>
      </div>
      <div className={S.swiperContainer}>
        <div className={S.swiper}>
          {recommendCard.map((card) => (
            <ProblemCard
              key={card.id}
              src={card.src}
              userName={card.userName}
              tags={card.tags}
              checked={card.checked}
            >
              {card.problemTitle}
            </ProblemCard>
          ))}
        </div>
        <button className={S.btnNext}>
          <img src="../../../public/icons/btn-more-circle.svg" alt="Next" />
        </button>
      </div>
    </div>
  );
}

export default CardSwiper;
