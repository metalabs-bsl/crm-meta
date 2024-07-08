import { FC, useState } from 'react';
import cn from 'classnames';
import { Button } from 'common/ui';
import { AccessChangeble, Tabs } from 'common/components';
import { ITabsItem } from 'common/components/Tabs/Tabs.helper';
import { useAppSelector } from 'common/hooks';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import { IComment, ICreateLeadParams, ICreateReminderParams } from 'types/entities';
import { ROLES } from 'types/roles';
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

interface IProps {
  formData?: ICreateLeadParams;
  reminders?: ICreateReminderParams[];
  comments?: IComment[];
}

export const AboutDeal: FC<IProps> = ({ formData, reminders, comments }) => {
  const { role } = useAppSelector(employeesSelectors.employees);
  const [isActiveTab, setIsActiveTab] = useState<string>(tabItems[0].type);
  const isCalculatorTab = isActiveTab === TAB_COMPONENTS.CALCULATOR;
  const [isAccess, setIsAccess] = useState<boolean>(true);
  const isManagement = role === ROLES.DIRECTOR || role === ROLES.SENIOR_MANAGER;

  const getActiveComponent = () => {
    const component = {
      [TAB_COMPONENTS.TODO]: <Todo reminders={reminders} comments={comments} />,
      [TAB_COMPONENTS.ACCOUNT]: <Accounts />,
      [TAB_COMPONENTS.CALCULATOR]: <Calculator />
    };
    return component[isActiveTab as TAB_COMPONENTS];
  };

  return (
    <div className={styles.aboutDeal}>
      {!isCalculatorTab && <DealsForm formProps={formData} />}
      <div className={cn(styles.rightBlock, { [styles.isCalculatorChild]: isCalculatorTab })}>
        <div className={cn(styles.wrapper, { [styles.isOnlyTab]: !isCalculatorTab })}>
          {isCalculatorTab && (
            <div className={styles.btns_wrapper}>
              {isManagement && <AccessChangeble isAccess={isAccess} setIsAccess={setIsAccess} />}
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
