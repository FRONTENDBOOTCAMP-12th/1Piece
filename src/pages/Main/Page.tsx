import CardSwiper from '@/components/CardSwiper/CardSwiper';
import useModalVisibleStore from '@/lib/ProblemModalState';
import CardModal from '@/components/CardModal/CardModal';
import { toast, Toaster } from 'react-hot-toast';
import { supabase } from '@/lib/SupabaseClient';
import useReloadStore from '@/lib/ReloadState';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import S from './MainPage.module.css';

interface ProblemCardData {
  id: string;
  src: string;
  userName: string;
  tags: string[];
  checked: boolean;
  description: string;
  problemTitle: string;
  count: number;
}

function MainPage() {
  // 데이터를 가져오는 동안 다른 UI를 나타내기 위한 loading 상태
  const [loading, setLoading] = useState<boolean>(true);
  const [itemCheck, setItemCheck] = useState<ProblemCardData[]>([]);
  const [itemCreated, setItemCreated] = useState<ProblemCardData[]>([]);
  // 모달 창에 나타낼 정보를 전달하기 위한 상태
  const cardInfo = useModalVisibleStore((state) => state.cardInfo);
  const reload = useReloadStore((state) => state.reload);
  const navigation = useNavigate();

  const fetchItems = async () => {
    try {
      // 조회수 순으로 내림차순 정렬된 데이터 가져오기(7개)
      const { data: dataCheck, error: errorCheck } = await supabase
        .from('card')
        .select('*,users(*)')
        .order('check', { ascending: false })
        .range(0, 6);

      // 생성 순으로 내림차순 정렬된 데이터 가져오기(7개)
      const { data: dataCreated, error: errorCreated } = await supabase
        .from('card')
        .select('*,users(*)')
        .order('created', { ascending: false })
        .range(0, 6);

      // ProblemCard에 사용되는 데이터 형식에 맞춰서 데이터 가공
      const newDataCheck =
        dataCheck
          ?.map((item) => {
            if (!item.users) {
              return null;
            }

            return {
              id: `${item.id}`,
              src: supabase.storage
                .from('profileImg/userProfile')
                .getPublicUrl(`${item.writer}.png`).data.publicUrl,
              userName: item.users.nickname,
              tags: Object.values(item.tags!),
              checked: false,
              problemTitle: item.problemTitle,
              description: item.desc,
              count: item.count,
            };
          })
          .filter(Boolean) ?? [];

      // ProblemCard에 사용되는 데이터 형식에 맞춰서 데이터 가공
      const newDataCreated =
        dataCreated
          ?.map((item) => {
            if (!item.users) {
              return null;
            }

            return {
              id: `${item.id}`,
              src: supabase.storage
                .from('profileImg/userProfile')
                .getPublicUrl(`${item.writer}.png`).data.publicUrl,
              userName: item.users.nickname,
              tags: Object.values(item.tags!),
              checked: false,
              problemTitle: item.problemTitle,
              description: item.desc,
              count: item.count,
            };
          })
          .filter(Boolean) ?? [];

      // 데이터를 정상적으로 받지 못했다면 ERROR 발생
      if (errorCreated) throw errorCreated;
      if (errorCheck) throw errorCheck;

      // 데이터 fetching이 완료됐다면 상태 업데이트를 통해 리렌더링
      if (dataCreated) setItemCreated(newDataCreated as ProblemCardData[]);
      if (dataCheck) setItemCheck(newDataCheck as ProblemCardData[]);
    } catch {
      alert('비정상적인 접근입니다');
    } finally {
      // 로딩 상태를 완료로 변경
      setLoading(false);
    }
  };

  // 중간 배너 클릭 시 회원가입 페이지로 이동 유도
  const handleMiniBannerClick = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      // 만약 로그인한 상태라면 핫-토스트로 알려주기
      toast.error('이미 로그인한 상태입니다.');
    } else {
      navigation('/sign-up');
    }
  };

  // 데이터를 가져오는 것은 렌더링과 무관한 일이므로 useEffect 사용
  useEffect(() => {
    fetchItems();
  }, [reload]);

  return (
    <>
      <title>Quzelly | 메인 페이지</title>
      <meta name="description" content="Quzelly 메인 페이지입니다" />
      <meta property="og:title" content="Quzelly" />
      <meta
        property="og:description"
        content="어디든 자유롭게! Quzelly에서 퀴즈를 풀고 탐험하세요."
      />
      <meta
        property="og:image"
        content="https://quzelly.vercel.app/images/main_banner.webp"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://quzelly.vercel.app/" />

      <h1 className="sr-only">큐젤리 메인 페이지</h1>
      <img
        src="/images/main_banner.webp"
        alt="큐젤리란"
        className={S.mainBanner}
      />

      <div className={S.mainContainer}>
        <CardSwiper data={itemCreated} sortStandard="popular" loading={loading}>
          카드 Top 7
        </CardSwiper>
        <button
          type="button"
          className={S.miniBannerButton}
          onClick={handleMiniBannerClick}
          aria-label="가입이 5초 안에 가능한 회원가입 페이지로 이동동"
        />
        {/* sortStandard="new"를 명시적으로 전달 */}
        <CardSwiper data={itemCheck} sortStandard="new" loading={loading}>
          추천 최신 카드
        </CardSwiper>
      </div>
      <CardModal
        src={cardInfo.src}
        tags={cardInfo.tags}
        userName={cardInfo.userName}
        description={cardInfo.description}
      >
        {cardInfo.title}
      </CardModal>
      <Toaster position="bottom-right" />
    </>
  );
}

export default MainPage;
