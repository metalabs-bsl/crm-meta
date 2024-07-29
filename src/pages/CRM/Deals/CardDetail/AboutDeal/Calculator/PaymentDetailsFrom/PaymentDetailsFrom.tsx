import { FC, useEffect } from 'react';
import { Options } from 'types/pages';
import { DatePicker, Icon, Input, Loading, Select } from 'common/ui';
import { Accordion } from 'common/components';
import { paymentOptions } from 'common/constants';
import { useCreatePaymentMutation } from 'api/admin/payment/payment.api';
import { useGetPaymentCurrencyQuery } from 'api/admin/paymentCurrency/paymentCurrency.api';
import { ICalcPayment, ICreatePaymentParams } from 'types/entities/leads';
import styles from './styles.module.scss';

import { useForm } from 'react-hook-form';

interface IProps {
  isActiveTab: string;
  formProps: ICreatePaymentParams | null;
  index: number;
  title: string;
  handleAddPaymentAccordion: () => void;
  handleEditPaymentAccordion: (index: number) => void;
  isEdit: boolean;
  paymentAccordions: {
    title: string;
    isEdit: boolean;
  }[];
}

export const PaymentDetailsFrom: FC<IProps> = ({
  isActiveTab,
  formProps,
  index,
  title,
  handleAddPaymentAccordion,
  handleEditPaymentAccordion,
  isEdit,
  paymentAccordions
}) => {
  const { register, getValues, setValue } = useForm<ICalcPayment>();
  const { data, isFetching } = useGetPaymentCurrencyQuery();
  const [createPayment] = useCreatePaymentMutation();

  const paymentCurrencyOptions: Options[] =
    data?.map((currency) => ({
      value: currency.id,
      label: currency?.currency || ''
    })) || [];

  useEffect(() => {
    if (formProps) {
      setValue('brutto', formProps.brutto);
      setValue('netto', formProps.netto);
      setValue('payment_method', formProps.payment_method);
      setValue('exchange_rate', formProps.exchange_rate);
      setValue('commission', formProps.commission);
      setValue('course_TO', formProps.course_TO);
      setValue('client_due_date', formProps.client_due_date);
      setValue('currency', { id: formProps.currency.id });
    }
  }, [formProps, setValue]);

  const onSubmit = () => {
    const data = getValues();
    const currency = typeof data.currency === 'string' ? { id: data.currency } : data.currency;
    const createPaymentDto = {
      ...data,
      currency: currency,
      comission: data.commission,
      calculator: {
        id: formProps?.calculator.id || ''
      },
      ...(formProps?.id && { id: formProps.id })
    };
    console.log('test', createPaymentDto);
    createPayment(createPaymentDto)
      .unwrap()
      .then(() => {
        console.log('Success');
      });
  };

  return (
    <>
      <Accordion
        title={index === 0 && isActiveTab === 'partial' ? 'Первая оплата' : title || ''}
        onEditAction={() => handleEditPaymentAccordion(index)}
        isEdit={isEdit}
        onSaveAction={() => onSubmit()}
      >
        <form className={styles.form}>
          <div className={styles.blocks}>
            <div className={styles.more_items_block}>
              <div className={styles.item_block}>
                <label>Брутто</label>
                <Input
                  {...register('brutto', { required: 'обязательное поле' })}
                  placeholder='Не заполнено'
                  className={styles.inp_wrapper}
                  disabled={!isEdit}
                />
              </div>
              <div className={styles.item_block}>
                <label>Нетто</label>
                <Input
                  {...register('netto', { required: 'обязательное поле' })}
                  placeholder='Не заполнено'
                  className={styles.inp_wrapper}
                  disabled={!isEdit}
                />
              </div>
            </div>
            <div className={styles.item_block}>
              <label>Способ оплаты</label>
              <Select
                {...register('payment_method', { required: 'обязательное поле' })}
                options={paymentOptions}
                className={styles.select}
                disabled={!isEdit}
              />
            </div>
          </div>
          <div className={styles.blocks}>
            <div className={styles.item_block}>
              <label>Валюта (сом)</label>
              <Input
                {...register('exchange_rate', { required: 'обязательное поле' })}
                placeholder='Не заполнено'
                className={styles.inp_wrapper}
                disabled={!isEdit}
              />
            </div>
            <div className={styles.item_block}>
              <label>Комиссия</label>
              <Input
                {...register('commission', { required: 'обязательное поле' })}
                placeholder='Не заполнено'
                className={styles.inp_wrapper}
                disabled={!isEdit}
              />
            </div>
          </div>
          <div className={styles.blocks}>
            <div className={styles.more_items_block}>
              <div className={styles.item_block}>
                <label>Курс ТО</label>
                <Input
                  {...register('course_TO', { required: 'обязательное поле' })}
                  placeholder='Не заполнено'
                  className={styles.inp_wrapper}
                  disabled={!isEdit}
                />
              </div>
              <div className={styles.item_block}>
                <label>СО клиента</label>
                <DatePicker
                  {...register('client_due_date', { required: 'обязательное поле' })}
                  className={styles.datepicker}
                  disabled={!isEdit}
                />
              </div>
            </div>
            <div className={styles.item_block}>
              <label>Валюта (Брутто/Нетто/Комиссия)</label>
              <Loading isSpin={isFetching}>
                <Select
                  {...register('currency', { required: 'обязательное поле' })}
                  options={paymentCurrencyOptions}
                  className={styles.select}
                  disabled={!isEdit}
                />
              </Loading>
            </div>
          </div>
        </form>
      </Accordion>
      {isActiveTab !== 'full' && paymentAccordions.length < 5 && (
        <Icon type='plus-gray' className={styles.plusIcon} onClick={handleAddPaymentAccordion} />
      )}
    </>
  );
};
