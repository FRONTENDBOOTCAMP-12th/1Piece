import CardSwiper from '@/components/CardSwiper/CardSwiper';
import S from './Page.module.css';

const dummyData = [
  {
    id: '1',
    src: 'dummy/dummy_profile.jpg',
    userName: 'dummy',
    tags: ['국어', '영어', '수학'],
    checked: false,
    problemTitle: 'cardTitle1',
  },
  {
    id: '2',
    src: 'dummy/dummy_profile.jpg',
    userName: 'dummy2',
    tags: ['국어', '영어', '수학'],
    checked: false,
    problemTitle: 'cardTitle2',
  },
  {
    id: '3',
    src: 'dummy/dummy_profile.jpg',
    userName: 'dummy3',
    tags: ['국어', '영어', '수학'],
    checked: false,
    problemTitle: 'cardTitle3',
  },
  {
    id: '4',
    src: 'dummy/dummy_profile.jpg',
    userName: 'dummy4',
    tags: ['국어', '영어', '수학'],
    checked: false,
    problemTitle: 'cardTitle4',
  },
];

function MainPage() {
  return (
    <>
      <img src="/dummy/dummy_banner.png" alt="" className={S.mainBanner} />
      <CardSwiper data={dummyData} />
      <CardSwiper data={dummyData} />
    </>
  );
}

export default MainPage;
