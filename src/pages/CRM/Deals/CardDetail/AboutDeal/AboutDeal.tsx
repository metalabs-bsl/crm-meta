import { useState } from 'react';
import cn from 'classnames';
import { Button, Icon } from 'common/ui';
import { Tabs } from 'common/components';
import { ITabsItem } from 'common/components/Tabs/Tabs.helper';
import { TAB_COMPONENTS } from './AboutDeal.helper';
import { Accounts } from './Accounts';
import { Calculator } from './Calculator';
import { DealsForm } from './DealsForm';
import { Todo } from './Todo';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

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
  const [isAccess, setIsAccess] = useState<boolean>(true);

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
        <div className={cn(styles.wrapper, { [styles.isOnlyTab]: !isCalculatorTab })}>
          {isCalculatorTab && (
            <div className={styles.btns_wrapper}>
              <div className={styles.access} onClick={() => setIsAccess(!isAccess)}>
                <span>Доступ {isAccess ? 'открыт' : 'закрыт'}</span>
                <Icon type={`calc-${isAccess ? 'open' : 'close'}`} />
              </div>
              <Button text='Создать договор' styleType={BUTTON_TYPES.LINK_GRAY} />
            </div>
          )}
          <Tabs tabItems={tabItems} isActiveTab={isActiveTab} setIsActiveTab={setIsActiveTab} />
        </div>
        <div className={cn(styles.box, { [styles.isDisabled]: isCalculatorTab && !isAccess })}>{getActiveComponent()}</div>
      </div>
    </div>
  );
};
