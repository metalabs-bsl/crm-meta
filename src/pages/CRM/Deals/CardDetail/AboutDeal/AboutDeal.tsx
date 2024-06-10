import { useState } from 'react';
import cn from 'classnames';
import { Tabs } from 'common/components';
import { ITabsItem } from 'common/components/Tabs/Tabs.helper';
import { TAB_COMPONENTS } from './AboutDeal.helper';
import { Accounts } from './Accounts';
import { Calculator } from './Calculator';
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

export const AboutDeal = ({ ...rest }) => {
  const [isActiveTab, setIsActiveTab] = useState<string>(tabItems[0].type);
  const isCalculatorTab = isActiveTab === TAB_COMPONENTS.CALCULATOR;
  const getActiveComponent = () => {
    const component = {
      [TAB_COMPONENTS.TODO]: <Todo />,
      [TAB_COMPONENTS.ACCOUNT]: <Accounts />,
      [TAB_COMPONENTS.CALCULATOR]: <Calculator />
    };
    return component[isActiveTab as TAB_COMPONENTS];
  };

  return (
    <div className={styles.aboutDeal}>
      {!isCalculatorTab && <DealsForm {...rest} />}
      <div className={cn(styles.rightBlock, { [styles.isCalculatorChild]: isCalculatorTab })}>
        <Tabs
          tabItems={tabItems}
          isActiveTab={isActiveTab}
          setIsActiveTab={setIsActiveTab}
          className={cn(styles.tab, { [styles.isEndTab]: isCalculatorTab })}
        />
        <div className={styles.box}>{getActiveComponent()}</div>
      </div>
    </div>
  );
};
