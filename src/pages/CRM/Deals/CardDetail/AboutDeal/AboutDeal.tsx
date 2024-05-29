import { useState } from 'react';
import { Tabs } from 'common/components';
import { ITabsItem } from 'common/components/Tabs/Tabs.helper';
import { TAB_COMPONENTS } from './AboutDeal.helper';
import { Accounts } from './Accounts';
import { DealsForm } from './DealsForm';
import { Todo } from './Todo';
import styles from './styles.module.scss';

const tabItems: ITabsItem[] = [
  {
    title: 'Дело',
    type: TAB_COMPONENTS.TODO
  },
  {
    title: 'Счета',
    type: TAB_COMPONENTS.ACCOUNT
  },
  {
    title: 'Калькулятор',
    type: TAB_COMPONENTS.CALCULATOR
  }
];

export const AboutDeal = () => {
  const [isActiveTab, setIsActiveTab] = useState<string>(tabItems[0].type);

  const getActiveComponent = () => {
    const component = {
      [TAB_COMPONENTS.TODO]: <Todo />,
      [TAB_COMPONENTS.ACCOUNT]: <Accounts />,
      [TAB_COMPONENTS.CALCULATOR]: <p>CALCULATOR</p>
    };
    return component[isActiveTab as TAB_COMPONENTS];
  };

  return (
    <div className={styles.aboutDeal}>
      <DealsForm />
      <div className={styles.rightBlock}>
        <Tabs tabItems={tabItems} isActiveTab={isActiveTab} setIsActiveTab={setIsActiveTab} className={styles.tab} />
        <div className={styles.box}>{getActiveComponent()}</div>
      </div>
    </div>
  );
};
