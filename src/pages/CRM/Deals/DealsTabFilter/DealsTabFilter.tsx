import { FC, useState } from 'react';
import cn from 'classnames';
import { DEALS_TABS, IMainTabs } from '../Deals.helper';
import styles from './style.module.scss';

interface IProps {
  mainTabs: IMainTabs[];
  isActiveTab: string;
  setIsActiveTab: (type: DEALS_TABS) => void;
}

export const DealsTabFilter: FC<IProps> = ({ mainTabs, isActiveTab, setIsActiveTab }) => {
  const [active, setActive] = useState<boolean>(false);
  const [count] = useState<number>(0);

  const onChangeTab = (type: DEALS_TABS) => {
    setIsActiveTab(type);
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
        <div className={cn(styles.tab, { [styles.activeTab]: active })} onClick={() => setActive(!active)}>
          Запланированные
          <span className={cn(styles.count, { [styles.notZeroCount]: count > 0 })}>{count}</span>
        </div>
      </div>
    </div>
  );
};
