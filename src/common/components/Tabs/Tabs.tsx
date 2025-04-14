import { FC } from 'react';
import cn from 'classnames';
import { Badge } from 'common/ui';
import { ITabsItem } from './Tabs.helper';
import styles from './styles.module.scss';

interface IProps {
  tabItems: ITabsItem[];
  isActiveTab: string;
  setIsActiveTab: (type: string) => void;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  onChange?: (type: string) => void;
}

export const Tabs: FC<IProps> = ({ tabItems, isActiveTab, setIsActiveTab, className, tabClassName, activeTabClassName, onChange }) => {
  const onChangeTab = (type: string, itemDisabled?: boolean) => {
    if (!itemDisabled) {
      onChange && onChange(type);
      setIsActiveTab(type);
    }
  };

  return (
    <div className={cn(styles.tabsBlock, className)}>
      {tabItems.map((tab, index) => (
        <div
          key={index}
          className={cn(
            styles.tab,
            tabClassName,
            { [cn(styles.activeTab, activeTabClassName)]: isActiveTab === tab.type },
            { [styles.disabled]: tab.disabled }
          )}
          onClick={() => onChangeTab(tab.type, tab.disabled)}
        >
          {tab.hasBadge ? <Badge count={tab.badgeCount}>{tab.title}</Badge> : tab.title}
        </div>
      ))}
    </div>
  );
};
