import FooterNavigation from './FooterNav';
import S from './Footer.module.css';

const navigation = {
  community: {
    title: 'Community',
    menu: [
      {
        text: 'Events',
        path: 'https://github.com/FRONTENDBOOTCAMP-12th/1Piece',
      },
      { text: 'Blog', path: 'https://velog.io/@rist98/series/Quzelly' },
      {
        text: 'Podcast',
        path: 'https://www.figma.com/design/IvyIVMx8wvyFSX2MzzTdJR/1Piece?node-id=178-2949&t=pGGr6p78u0cS7CIK-1',
      },
      {
        text: 'Invite a friend',
        path: 'https://bootcamp.likelion.net/?utm_source=google&utm_medium=search&utm_campaign=kdtall_google_search_brand_pcmo&utm_content=%EB%A9%8B%EC%9F%81%EC%9D%B4%20%EC%82%AC%EC%9E%90%20%EC%B2%98%EB%9F%BC&utm_term=new_00_brand_all_pcmo&gad_source=1&gclid=CjwKCAjwnPS-BhBxEiwAZjMF0lAlKA74lVl0FDnRYHPxvcBXSnPYllQIZpG_yBZrspJHmK2GdbNS-RoCT50QAvD_BwE',
      },
    ],
  },

  socials: {
    title: 'Socials',
    menu: [
      {
        text: 'Discord',
        path: 'https://discordapp.com/users/365396272800202753',
      },
      { text: 'Instagram', path: 'https://www.instagram.com/shrnrwhd/' },
      { text: 'Twitter', path: 'https://supabase.com/' },
      { text: 'Facebook', path: 'https://zustand-demo.pmnd.rs/' },
    ],
  },
};

const sns = ['facebook', 'instagram', 'twitter'];

function Footer() {
  return (
    <footer className={S.footerContainer}>
      <section className={S.wrapperBox}>
        <h2 className="sr-only">푸터 메뉴 내비게이션</h2>
        <div className={S.footerLeft}>
          <a href="/">
            <img src="/icons/logo.svg" alt="자유롭게 상상하라. 큐젤리" />
          </a>
          <div className={S.footerDescription}>
            <p>Our vision is to provide convenience</p>
            <p>and help increase your sales business.</p>
          </div>
          <div className={S.snsContainer}>
            {sns.map((sns, index) => (
              <img
                key={`sns-${index}`}
                src={`/icons/${sns}.svg`}
                alt={`${sns} 바로가기`}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>

        <nav className={S.footerRight}>
          {Object.values(navigation).map((nav, index) => (
            <FooterNavigation key={`${index}`} element={nav} />
          ))}
        </nav>
      </section>

      <div className={S.footerBottom}>
        <p>© 2022 Auto Fast. All rights reserved</p>
        <nav className={S.footerPolicy}>
          <ul>
            <li>
              <a href="https://ko.react.dev/">Privacy & Policy</a>
            </li>
            <li>
              <a href="https://www.typescriptlang.org/">Terms & Condition</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
