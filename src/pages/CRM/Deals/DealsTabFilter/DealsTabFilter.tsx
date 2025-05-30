import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { DEALS_TABS, IMainTabs } from '../Deals.helper';
import styles from './style.module.scss';

interface IProps {
  mainTabs: IMainTabs[];
  isActiveTab: string;
  setIsActiveTab: (type: DEALS_TABS) => void;
  reminderCount: number;
}

export const DealsTabFilter: FC<IProps> = ({ mainTabs, isActiveTab, setIsActiveTab, reminderCount }) => {
  const [active, setActive] = useState<boolean>(false);
  const onChangeTab = (type: DEALS_TABS) => {
    setIsActiveTab(type);
  };

  const onActiveClick = () => {
    setActive(!active);
    onChangeTab(DEALS_TABS.todos);
  };

  useEffect(() => {
    if (isActiveTab !== DEALS_TABS.todos) {
      setActive(false);
    }
  }, [isActiveTab]);

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
        <div className={cn(styles.tab, { [styles.activeTab]: active })} onClick={onActiveClick}>
          Запланированные
          <span className={cn(styles.count, { [styles.notZeroCount]: reminderCount > 0 })}>{reminderCount}</span>
        </div>
      </div>
    </div>
  );
};
