import { useState } from 'react';
import cn from 'classnames';
import { Select } from 'common/ui';
import { Tabs } from 'common/components';
import { ITabsItem } from 'common/components/Tabs/Tabs.helper';
import { AgreementForm } from './AgreementForm';
import { PaymentDetailsFrom } from './PaymentDetailsFrom';
import { TourInfoForm } from './TourInfoForm';
import { UpsellForm } from './UpsellForm';
import styles from './styles.module.scss';

const tabItems: ITabsItem[] = [
  {
    title: 'Полная оплата',
    type: 'full'
  },
  {
    title: 'Частичная оплата',
    type: 'partial'
  }
];

const payOptions = [
  {
    title: 'Оплачено',
    value: 'paid'
  },
  {
    title: 'Частичная',
    value: 'partial'
  },
  {
    title: 'Не оплачено',
    value: 'not-paid'
  }
];

export const Calculator = () => {
  const [isActiveTab, setIsActiveTab] = useState<string>(tabItems[0].type);
  const [selectValue, setSelectValue] = useState<string>(payOptions[2].value);

  return (
    <div className={styles.calculator}>
      <AgreementForm />
      <div className={styles.tab_block}>
        <Tabs
          isActiveTab={isActiveTab}
          setIsActiveTab={setIsActiveTab}
          tabItems={tabItems}
          className={styles.tabs}
          tabClassName={styles.tab}
          activeTabClassName={styles.activeTab}
        />
        <Select
          defaultValue={selectValue}
          options={payOptions}
          className={cn(styles.select, styles[selectValue])}
          onChange={(e) => setSelectValue(e.target.value)}
        />
      </div>

      <PaymentDetailsFrom isActiveTab={isActiveTab} />
      <TourInfoForm />
      <UpsellForm />
    </div>
  );
};
