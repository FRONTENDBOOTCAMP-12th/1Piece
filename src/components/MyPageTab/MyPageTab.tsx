import { NavLink } from 'react-router';
import S from './MyPageTab.module.css';

interface MyPageTabProps {
  tabs: { name: string; path: string }[];
}

function MyPageTab({ tabs }: MyPageTabProps) {
  return (
    <nav className={S.tabList}>
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            `${S.tab} ${isActive ? S.activeTab : ''}`
          }
        >
          {tab.name}
        </NavLink>
      ))}
    </nav>
  );
}

export default MyPageTab;
