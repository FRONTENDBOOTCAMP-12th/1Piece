import CardSwiper from '@/components/CardSwiper/CardSwiper';

const data = [
  {
    id: 'cardTitle1',
    src: '/dummy/dummy_profile.jpg',
    userName: 'dummy',
    tags: ['국어', '영어', '수학'],
    checked: false,
    problemTitle: 'cardTitle',
  },
  {
    id: 'cardTitle2',
    src: '/dummy/dummy_profile.jpg',
    userName: 'dummy',
    tags: ['국어', '영어', '수학'],
    checked: false,
    problemTitle: 'cardTitle',
  },
  {
    id: 'cardTitle3',
    src: '/dummy/dummy_profile.jpg',
    userName: 'dummy',
    tags: ['국어', '영어', '수학'],
    checked: false,
    problemTitle: 'cardTitle',
  },
  {
    id: 'cardTitle4',
    src: '/dummy/dummy_profile.jpg',
    userName: 'dummy',
    tags: ['국어', '영어', '수학'],
    checked: false,
    problemTitle: 'cardTitle',
  },
  {
    id: 'cardTitle5',
    src: '/dummy/dummy_profile.jpg',
    userName: 'dummy',
    tags: ['국어', '영어', '수학'],
    checked: false,
    problemTitle: 'cardTitle',
  },
  {
    id: 'cardTitle6',
    src: '/dummy/dummy_profile.jpg',
    userName: 'dummy',
    tags: ['국어', '영어', '수학'],
    checked: false,
    problemTitle: 'cardTitle',
  },
  {
    id: 'cardTitle7',
    src: '/dummy/dummy_profile.jpg',
    userName: 'dummy',
    tags: ['국어', '영어', '수학'],
    checked: false,
    problemTitle: 'cardTitle',
  },
  {
    id: 'cardTitle8',
    src: '/dummy/dummy_profile.jpg',
    userName: 'dummy',
    tags: ['국어', '영어', '수학'],
    checked: false,
    problemTitle: 'cardTitle',
  },
];

function MainPage() {
  return (
    <div>
      <CardSwiper data={data}>지난 주 베스트</CardSwiper>
    </div>
  );
}

export default MainPage;
