import MyPageDiary from '@/components/MyPageDiary/MyPageDiary';
import MyPageTab from '@/components/MyPageTab/MyPageTab';
import S from './Page.module.css';

function BadgePage() {
  const tabs = [
    { name: '달력', path: '/calendar' },
    { name: '뱃지', path: '/badge' },
  ];

  return (
    <div className={S.MyPageContainer}>
      <title>Quzelly | 뱃지</title>

      <MyPageDiary title="B A D G E" activeButton={2}>
        뱃지 공간
      </MyPageDiary>
      <MyPageTab tabs={tabs} />
    </div>
  );
}

export default BadgePage;
