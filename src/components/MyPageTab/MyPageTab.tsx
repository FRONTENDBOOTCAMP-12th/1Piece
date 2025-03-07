import { useState } from 'react';
import S from './MyPageTab.module.css';

interface MyPageTabProps {
  tabs: string[];
  onTabChange: (tab: string) => void;
}

function MyPageTab({ tabs, onTabChange }: MyPageTabProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <nav className={S.tabList}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${S.tab} ${activeTab === tab ? S.activeTab : ''}`}
          onClick={() => handleTabClick(tab)}
          role="tab"
          aria-selected={activeTab === tab}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}

export default MyPageTab;
