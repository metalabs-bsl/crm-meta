import { FC, useState } from 'react';
import cn from 'classnames';
import { Options } from 'types/pages';
import { Loading, Select } from 'common/ui';
import { Tabs } from 'common/components';
import { ITabsItem } from 'common/components/Tabs/Tabs.helper';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useUpdateLeadCalcPaidStatusMutation } from 'api/admin/leads/leads.api';
import { ICalculator } from 'types/entities/leads';
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

const payOptions: Options[] = [
  {
    label: 'Оплачено',
    value: 'Оплачено'
  },
  {
    label: 'Частично',
    value: 'Частично'
  },
  {
    label: 'Не оплачено',
    value: 'Не оплачено'
  }
];

interface IProps {
  calcData?: ICalculator;
}

export const Calculator: FC<IProps> = ({ calcData }) => {
  const [updatePaidStatus, { isLoading }] = useUpdateLeadCalcPaidStatusMutation();
  const [isActiveTab, setIsActiveTab] = useState<string>(tabItems[0].type);
  const [servises, setServises] = useState<Options[]>([]);
  const notify = useNotify();

  const changePaidStatus = (status: string) => {
    if (calcData) {
      updatePaidStatus({ calc_id: calcData.id, paid_status: status })
        .unwrap()
        .then(() => {
          notify(MESSAGE.UPDATED, 'success');
        });
    }
  };

  return (
    <Loading isSpin={isLoading}>
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
          {calcData && (
            <Select
              defaultValue={calcData.payment_status}
              options={payOptions}
              className={cn(styles.select, {
                [styles.not_paid]: calcData.payment_status === 'Не оплачено',
                [styles.paid]: calcData.payment_status === 'Оплачено',
                [styles.partial]: calcData.payment_status === 'Частично'
              })}
              onChange={(e) => changePaidStatus(e.target.value)}
            />
          )}
        </div>
        <PaymentDetailsFrom isActiveTab={isActiveTab} />
        <TourInfoForm setServises={setServises} />
        {servises.map((_, index) => (
          <UpsellForm key={index} />
        ))}
      </div>
    </Loading>
  );
};
