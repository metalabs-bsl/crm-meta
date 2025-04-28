/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { Loading, Select } from 'common/ui';
import { Tabs } from 'common/components';
import { DeleteModal } from 'common/components/DeleteModal';
import { ITabsItem } from 'common/components/Tabs/Tabs.helper';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import {
  useChoicePaymentToggleMutation,
  useGetBrandsQuery,
  useGetServisesQuery,
  useUpdateLeadCalcPaidStatusMutation
} from 'api/admin/leads/endpoints/calculator';
import { Options } from 'types/common';
import { ICalculator, IResCalc, IUpdateContract } from 'types/entities/leads';
import { PaymentsDetails } from './PaymentDetailsFrom/PaymentsDetails';
import { AgreementForm } from './AgreementForm';
import { TourInfoForm } from './TourInfoForm';
import { UpsellForm } from './UpsellForm';
import styles from './styles.module.scss';

const payOptions: Options[] = [
  { label: 'Оплачено', value: 'Оплачено' },
  { label: 'Частично', value: 'Частично' },
  { label: 'Не оплачено', value: 'Не оплачено' }
];

interface IProps {
  data?: IResCalc;
  calcData?: ICalculator;
}

export const Calculator: FC<IProps> = ({ calcData, data }) => {
  const notify = useNotify();
  const [updatePaidStatus, { isLoading }] = useUpdateLeadCalcPaidStatusMutation();
  const [choicePaymentToggle] = useChoicePaymentToggleMutation();
  const { data: servicesOptions } = useGetServisesQuery();
  const { data: brandOptions } = useGetBrandsQuery();

  const tabItems: ITabsItem[] = [
    { title: 'Полная оплата', type: 'full', disabled: false },
    { title: 'Частичная оплата', type: 'partial', disabled: false }
  ];

  const [isActiveTab, setIsActiveTab] = useState<string>('full');
  const [isFullPayment, setIsFullPayment] = useState<boolean>(true);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [nextTab, setNextTab] = useState<string>('');

  // устанавливаем начальное состояние только один раз при монтировании
  useEffect(() => {
    if (data) {
      const currentType = data.is_full_payment ? 'full' : 'partial';
      setIsActiveTab(currentType);
      setIsFullPayment(data.is_full_payment);
    }
  }, [data?.id]); // зависит только от id

  const handleTabChange = (newTab: string) => {
    if (newTab !== isActiveTab) {
      setNextTab(newTab);
      setShowConfirmModal(true);
    }
  };

  const confirmTabChange = async () => {
    if (data?.id) {
      try {
        await choicePaymentToggle(data.id).unwrap();
        setIsActiveTab(nextTab);
        setIsFullPayment(nextTab === 'full');
        setShowConfirmModal(false);

        // Обновление status оплаты при смене вкладки
        if (nextTab === 'partial') {
          changePaidStatus('Частично');
        } else if (nextTab === 'full') {
          changePaidStatus('Оплачено');
        }
      } catch (err) {
        console.error('Ошибка при смене типа оплаты:', err);
      }
    } else {
      console.error('ID is undefined');
    }
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

  const contractFormProps: IUpdateContract | null = useMemo(() => {
    if (data) {
      const contract = data.contracts[0];
      const customer = contract?.customer;
      const responsible = contract?.responsible;
      return {
        id: contract.id,
        contract_number: contract.contract_number,
        booking_date: contract.booking_date,
        customer_passport: customer?.passport,
        customer_inn: customer?.inn,
        customer_address: customer?.address,
        customer_DOB: customer?.date_of_birth,
        customer_fullname: customer?.fullname,
        responsible_id: responsible?.id,
        customer_passportDateGiven: customer?.datePassportGiven,
        customer_passportDateEnds: customer?.datePassportEnds,
        customer_issuingAuthority: customer?.issuingAuthority,
        passport_back: customer?.passport_back,
        passport_front: customer?.passport_front
      };
    }
    return null;
  }, [data]);

  return (
    <Loading isSpin={isLoading}>
      <div className={cn(styles.calculator, { [styles.isDisabled]: calcData?.is_closed })}>
        {data && <AgreementForm formProps={contractFormProps} customerId={data.contracts[0].customer.id} />}

        <div className={styles.tab_block}>
          <Tabs
            isActiveTab={isActiveTab}
            setIsActiveTab={() => {}} // управляем через onChange
            tabItems={tabItems}
            className={styles.tabs}
            tabClassName={styles.tab}
            activeTabClassName={styles.activeTab}
            onChange={handleTabChange}
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
          isFullPayment={isFullPayment}
          paymentsList={data?.paymentData}
        />

        {servicesOptions && brandOptions && (
          <TourInfoForm formProps={data?.tourData[0]} calcId={data?.id} servicesOptions={servicesOptions} brandOptions={brandOptions} />
        )}

        {data?.additionalPayments?.map((item, index) => <UpsellForm calcId={data?.id} title={item.name} formProps={item} key={index} />)}

        <DeleteModal
          text='Вы уверены, что хотите изменить тип оплаты?.'
          isOpen={showConfirmModal}
          onDelete={confirmTabChange}
          onCancel={() => setShowConfirmModal(false)}
        />
      </div>
    </Loading>
  );
};
