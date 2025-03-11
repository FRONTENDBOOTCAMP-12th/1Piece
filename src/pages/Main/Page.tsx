import CardSwiper, {
  ProblemCardData,
} from '@/components/CardSwiper/CardSwiper';
import S from './MainPage.module.css';
import { supabase } from '@/lib/SupabaseClient';
import { useEffect, useState } from 'react';
import ProblemCardModal from '@/components/ProblemCardModal/ProblemCardModal';
import useModalVisibleStore from '@/lib/ProblemModalState';

function MainPage() {
  // 데이터를 가져오는 동안 다른 UI를 나타내기 위한 loading 상태
  const [loading, setLoading] = useState<boolean>(true);
  const [itemCheck, setItemCheck] = useState({});
  const [itemCreated, setItemCreated] = useState({});
  const userInfo = useModalVisibleStore((state) => state.userInfo);

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
      const newDataCheck = dataCheck?.map((item) => ({
        id: item.id,
        src: supabase.storage
          .from('profileImg/userProfile')
          .getPublicUrl(`${item.users.id}.png`).data.publicUrl,
        userName: item.users.nickname,
        tags: Object.values(item.tags!),
        checked: false,
        problemTitle: item.problemTitle,
      }));

      // ProblemCard에 사용되는 데이터 형식에 맞춰서 데이터 가공
      const newDataCreated = dataCreated?.map((item) => ({
        id: item.id,
        src: supabase.storage
          .from('profileImg/userProfile')
          .getPublicUrl(`${item.users.id}.png`).data.publicUrl,
        userName: item.users.nickname,
        tags: Object.values(item.tags!),
        checked: false,
        problemTitle: item.problemTitle,
      }));

      // 데이터를 정상적으로 받지 못했다면 ERROR 발생
      if (errorCreated) throw errorCreated;
      if (errorCheck) throw errorCheck;

      // 데이터 fetching이 완료됐다면 상태 업데이트를 통해 리렌더링
      if (dataCreated) setItemCreated(newDataCreated as []);
      if (dataCheck) setItemCheck(newDataCheck as []);
    } catch (error) {
      console.log(error);
    } finally {
      // 로딩 상태를 완료로 변경
      setLoading(false);
    }
  };

  // 데이터를 가져오는 것은 렌더링과 무관한 일이므로 useEffect 사용
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      {/* 메인 배너 DUMMY 데이터 */}
      <img
        src="/dummy/dummy_banner.png"
        alt="큐젤리란"
        className={S.mainBanner}
      />
      {loading ? (
        // 데이터를 불러오는 중에 사용할 UI
        <p>로딩 중...</p>
      ) : (
        <>
          {/* 데이터 fetching이 완료됐다면 나타낼 UI */}
          <CardSwiper data={itemCreated as ProblemCardData[]}>
            지난 주 베스트
          </CardSwiper>
          <hr className={S.line} />
          <CardSwiper data={itemCheck as ProblemCardData[]}>
            지난 주 최다 조회수
          </CardSwiper>
        </>
      )}
      <ProblemCardModal
        src={userInfo.src}
        tags={userInfo.tags}
        userName={userInfo.userName}
        description={userInfo.description}
      >
        {userInfo.title}
      </ProblemCardModal>
    </>
  );
}

export default MainPage;
