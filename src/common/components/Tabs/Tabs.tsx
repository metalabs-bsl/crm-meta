import { FC } from 'react';
import cn from 'classnames';
import { ITabsItem } from './Tabs.helper';
import styles from './styles.module.scss';

interface IProps {
  tabItems: ITabsItem[];
  isActiveTab: string;
  setIsActiveTab: (type: string) => void;
}

export const Tabs: FC<IProps> = ({ tabItems, isActiveTab, setIsActiveTab }) => {
  const onChangeTab = (type: string) => {
    setIsActiveTab(type);
  };

  return (
    <div className={styles.tabsBlock}>
      {tabItems.map((tab, index) => (
        <div key={index} className={cn(styles.tab, { [styles.activeTab]: isActiveTab === tab.type })} onClick={() => onChangeTab(tab.type)}>
          {tab.title}
        </div>
      ))}
    </div>
  );
};
