import { NavLink } from 'react-router';
import Button from '../Button/Button';
import S from './MyPageDiary.module.css';

function MyPageDiary() {
  const pathname = new URL(location.href).pathname;

  return (
    <div className={S.diaryContainer}>
      <div className={S.leftDiary}>
        <p className={S.levelText}>LV.999 | 김멋사</p>
        <img
          src="/dummy/dummy_profile.jpg"
          alt="유저 프로필 사진"
          className={S.diaryProfile}
        />
        <div className={S.myPageButtonContainer}>
          <NavLink to="/library" className={S.myPageRouterBtn}>
            <Button
              label="Library"
              style={{ width: '80%' }}
              color={pathname.includes('library') ? 'secondary' : 'dark-gray'}
            />
          </NavLink>
          <NavLink to="/reward" className={S.myPageRouterBtn}>
            <Button
              label="Reward"
              style={{ width: '80%' }}
              color={pathname.includes('Reward') ? 'secondary' : 'dark-gray'}
            />
          </NavLink>
          <NavLink to="/user-setting" className={S.myPageRouterBtn}>
            <Button
              label="개인정보 관리"
              style={{ width: '80%' }}
              color={
                pathname.includes('user-setting') ? 'secondary' : 'dark-gray'
              }
            />
          </NavLink>
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
  );
}

export default MyPageDiary;
