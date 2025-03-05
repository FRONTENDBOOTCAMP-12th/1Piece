import S from './Footer.module.css';
import { Link } from 'react-router';

function FooterNavigation({
  element,
}: {
  element: { title: string; menu: { text: string; path: string }[] };
}) {
  return (
    <div className={S.footerNav}>
      <p>{element.title}</p>
      <ul>
        {element.menu.map(({ text, path }, index) =>
          path ? (
            <li key={`footer-item-${index}`}>
              <Link to={path}>{text}</Link>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}

export default FooterNavigation;
