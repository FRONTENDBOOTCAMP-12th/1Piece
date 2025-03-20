import S from './Footer.module.css';
import FooterNavigation from './FooterNav';

const navigation = {
  about: {
    title: 'About',
    menu: [
      { text: 'How it works', path: '/' },
      { text: 'Featured', path: '/' },
      { text: 'Partnership', path: '/' },
      { text: 'Business Relation', path: '/' },
    ],
  },

  community: {
    title: 'Community',
    menu: [
      { text: 'Events', path: '/' },
      { text: 'Blog', path: '/' },
      { text: 'Podcast', path: '/' },
      { text: 'Invite a friend', path: '/' },
    ],
  },

  socials: {
    title: 'Socials',
    menu: [
      { text: 'Discord', path: '/' },
      { text: 'Instagram', path: '/' },
      { text: 'Twitter', path: '/' },
      { text: 'Facebook', path: '/' },
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
              <a key={`sns-${index}`} href="/">
                <img src={`/icons/${sns}.svg`} alt={`${sns} 바로가기`} />
              </a>
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
              <a href="/">Privacy & Policy</a>
            </li>
            <li>
              <a href="/">Terms & Condition</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
