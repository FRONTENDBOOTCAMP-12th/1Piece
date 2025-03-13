import { useNavigate, useLocation } from 'react-router'; // useLocation 추가
import S from './MyPageTab.module.css';

interface MyPageTabProps {
  tabs: { name: string; path: string }[];
}

function MyPageTab({ tabs }: MyPageTabProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (path: string) => {
    navigate(path);
  };

  return (
    <nav className={S.tabList}>
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            className={`${S.tab} ${isActive ? S.activeTab : ''}`}
            onClick={() => handleTabClick(tab.path)}
          >
            {tab.name}
          </button>
        );
      })}
    </nav>
  );
}

export default MyPageTab;
