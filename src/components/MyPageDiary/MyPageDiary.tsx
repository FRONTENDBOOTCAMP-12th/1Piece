import Button from '../Button/Button';
import S from './MyPageDiary.module.css';

function MyPageDiary() {
  return (
    <>
      <div className={S.diaryContainer}>
        <div className={S.leftDiary}>
          <p className={S.levelText}>LV.999 | 김멋사</p>
          <img
            src="/dummy/dummy_profile.jpg"
            alt="유저 프로필 사진"
            className={S.diaryProfile}
          />
          <div className={S.myPageButtonContainer}>
            <Button label="Library" />
            <Button label="Reward" />
            <Button label="개인정보 관리" />
          </div>
        </div>
        <div className={S.rightDiary}>테스트</div>
        <div className={S.springContainer}>
          <div className={S.topSpringContainer}>
            <div />
            <div />
          </div>
          <div className={S.bottomSpringContainer}>
            <div />
            <div />
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPageDiary;
