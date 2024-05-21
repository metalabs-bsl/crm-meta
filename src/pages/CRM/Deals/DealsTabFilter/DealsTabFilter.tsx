import { FC, useState } from 'react';
import cn from 'classnames';
import { DEALS_TABS, IMainTabs } from '../Deals.helper';
import styles from './style.module.scss';

const filterTabs = [
  {
    title: 'Входящие',
    type: 'inbox',
    count: 0
  },
  {
    title: 'Запланированные',
    type: 'planned',
    count: 3
  }
];

interface IProps {
  mainTabs: IMainTabs[];
  isActiveTab: string;
  setIsActiveTab: (type: DEALS_TABS) => void;
}

export const DealsTabFilter: FC<IProps> = ({ mainTabs, isActiveTab, setIsActiveTab }) => {
  const [filterType, setFilterType] = useState<string>(filterTabs[0].type);

  const onChangeTab = (type: DEALS_TABS) => {
    setIsActiveTab(type);
  };

  const onChangeFilter = (type: string) => {
    setFilterType(type);
  };

  return (
    <div className={styles.tabFilterBlock}>
      <div className={styles.tabsBlock}>
        {mainTabs.map((tab, index) => (
          <div
            key={index}
            className={cn(styles.tab, { [styles.activeTab]: isActiveTab === tab.type })}
            onClick={() => onChangeTab(tab.type)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div className={cn(styles.tabsBlock, styles.countBlock)}>
        <span>Мои:</span>
        {filterTabs.map((tab, index) => (
          <div
            key={index}
            className={cn(styles.tab, { [styles.activeTab]: filterType === tab.type })}
            onClick={() => onChangeFilter(tab.type)}
          >
            {tab.title}
            <span className={styles.count}>{tab.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
