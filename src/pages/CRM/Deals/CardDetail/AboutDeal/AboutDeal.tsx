import { useState } from 'react';
import { Tabs } from 'common/components';
import { ITabsItem } from 'common/components/Tabs/Tabs.helper';
import { DealsForm } from './DealsForm';
import styles from './styles.module.scss';

const tabItems: ITabsItem[] = [
  {
    title: 'Дело',
    type: 'todo'
  },
  {
    title: 'Комментарий',
    type: 'comment'
  },
  {
    title: 'Счета',
    type: 'account'
  },
  {
    title: 'Калькулятор',
    type: 'calculator'
  }
];

export const AboutDeal = () => {
  const [isActiveTab, setIsActiveTab] = useState<string>(tabItems[0].type);

  return (
    <div className={styles.aboutDeal}>
      <DealsForm />
      <div className={styles.rightBlock}>
        <Tabs tabItems={tabItems} isActiveTab={isActiveTab} setIsActiveTab={setIsActiveTab} />
      </div>
    </div>
  );
};
