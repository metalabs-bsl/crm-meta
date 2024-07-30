import { FC, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Options } from 'types/pages';
import { Loading, Select } from 'common/ui';
import { Tabs } from 'common/components';
import { ITabsItem } from 'common/components/Tabs/Tabs.helper';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import {
  useChoicePaymentToggleMutation,
  useLazyGetLeadCalcQuery,
  useUpdateLeadCalcPaidStatusMutation
} from 'api/admin/leads/endpoints/calculator';
import { ICalculator, IUpdateContract } from 'types/entities/leads';
import { PaymentsDetails } from './PaymentDetailsFrom/PaymentsDetails';
import { AgreementForm } from './AgreementForm';
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
  const { search } = useLocation();
  const notify = useNotify();
  const [updatePaidStatus, { isLoading }] = useUpdateLeadCalcPaidStatusMutation();
  const [getCalc, { data, isFetching }] = useLazyGetLeadCalcQuery();
  const [choicePaymentToggle] = useChoicePaymentToggleMutation();
  const [isActiveTab, setIsActiveTab] = useState<string>(tabItems[0].type);

  const contractFormProps: IUpdateContract | null = useMemo(() => {
    if (data) {
      return {
        id: data.contracts[0].id,
        contract_number: data?.contracts[0].contract_number,
        booking_date: data?.contracts[0].booking_date,
        customer_passport: data?.contracts[0].customer.passport,
        customer_inn: data?.contracts[0].customer.inn,
        customer_address: data?.contracts[0].customer.address,
        passports: data?.contracts[0].customer.passports,
        customer_fullname: data?.contracts[0].customer.fullname,
        responsible_id: data?.contracts[0].responsible.id,
        customer_passportDateGiven: data?.contracts[0].customer.datePassportGiven,
        customer_issuingAuthority: data?.contracts[0].customer.issuingAuthority
      };
    }
    return null;
  }, [data]);

  useEffect(() => {
    if (search) {
      const leadId = search.substring(1);
      getCalc(leadId);
    }
  }, [getCalc, search]);

  useEffect(() => {
    if (data) {
      setIsActiveTab(data.is_full_payment ? 'full' : 'partial');
    }
  }, [data]);

  const togllePaymentType = () => {
    data && choicePaymentToggle(data?.id);
  };

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
    <Loading isSpin={isLoading || isFetching}>
      <div className={styles.calculator}>
        <AgreementForm formProps={contractFormProps} />
        <div className={styles.tab_block}>
          <Tabs
            disabled={!!data?.paymentData.length}
            isActiveTab={isActiveTab}
            setIsActiveTab={setIsActiveTab}
            tabItems={tabItems}
            className={styles.tabs}
            tabClassName={styles.tab}
            activeTabClassName={styles.activeTab}
            onChange={togllePaymentType}
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
        <PaymentsDetails
          calculator_id={data?.id || ''}
          isActiveTab={isActiveTab}
          isFullPayment={data?.is_full_payment}
          paymentsList={data?.paymentData}
        />
        <TourInfoForm formProps={data?.tourData[0]} calcId={data?.id} />
        {data?.tourData[0]?.services?.map((_, index) => <UpsellForm key={index} />)}
      </div>
    </Loading>
  );
};
