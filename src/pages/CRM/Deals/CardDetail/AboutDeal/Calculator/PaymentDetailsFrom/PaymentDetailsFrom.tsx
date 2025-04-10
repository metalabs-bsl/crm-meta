import { FC, useEffect, useMemo, useState } from 'react';
import dayjs, { extend } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { DatePicker, Icon, Input, Loading, Select } from 'common/ui';
import { Accordion, Modal } from 'common/components';
import { useNotify } from 'common/hooks';
import { MESSAGE, paymentOptions } from 'common/constants';
import { useCreatePaymentMutation } from 'api/admin/leads/endpoints/calculator';
import { useGetPaymentCurrencyQuery } from 'api/admin/paymentCurrency/paymentCurrency.api';
import { Options } from 'types/common';
import { ICalcPayment, ICreatePaymentParams } from 'types/entities/leads';
import styles from './styles.module.scss';

import { useForm } from 'react-hook-form';
import { BUTTON_TYPES } from 'types/enums';

extend(utc);

interface IProps {
  isActiveTab: string;
  formProps: ICreatePaymentParams | null;
  index: number;
  title: string;
  handleAddPaymentAccordion: () => void;
  handleEditPaymentAccordion: (index: number) => void;
  handleDeletePaymentAccordion?: (index: number) => void;
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
  paymentAccordions,
  handleDeletePaymentAccordion
}) => {
  const notify = useNotify();
  const { data } = useGetPaymentCurrencyQuery();
  const [isAddPaumentModal, setIsAddPaumentModal] = useState<boolean>(false);
  const [saveStatusTrueorFalse, setSaveStatusTrueorFalse] = useState<boolean>(false);

  const paymentCurrencyOptions = useMemo<Options[]>(() => {
    return (
      data?.map((currency) => ({
        value: currency.id,
        label: currency?.currency || ''
      })) || []
    );
  }, [data]);

  const { register, getValues, setValue, watch } = useForm<ICalcPayment>();
  const [createPayment, { isLoading }] = useCreatePaymentMutation();
  const updatedTitle = index === 0 ? (isActiveTab === 'partial' ? title || '' : 'Данные об оплате') : title;

  const brutto = watch('brutto');
  const course_TO = watch('course_TO');
  const netto = watch('netto');

  useEffect(() => {
    if (brutto && course_TO) {
      const calculatedValue = Number(brutto) * Number(course_TO);
      setValue('exchange_rate', Number(calculatedValue.toFixed(2)));
    }
  }, [brutto, course_TO, setValue]);

  useEffect(() => {
    if (brutto && netto) {
      const calculatedValue = Number(brutto) - Number(netto);
      setValue('commission', Number(calculatedValue.toFixed(2)));
    }
  }, [brutto, netto, setValue]);

  useEffect(() => {
    if (formProps) {
      if (formProps.brutto !== watch('brutto')) setValue('brutto', formProps.brutto);
      if (formProps.netto !== watch('netto')) setValue('netto', formProps.netto);
      if (formProps.payment_method !== watch('payment_method')) setValue('payment_method', formProps.payment_method);
      if (formProps.exchange_rate !== watch('exchange_rate')) setValue('exchange_rate', formProps.exchange_rate);
      if (formProps.commission !== watch('commission')) setValue('commission', formProps.commission);
      if (formProps.course_TO !== watch('course_TO')) setValue('course_TO', formProps.course_TO);
      const formattedDate = dayjs.utc(formProps.client_due_date).isValid()
        ? dayjs.utc(formProps.client_due_date).format('YYYY-MM-DD')
        : dayjs().format('YYYY-MM-DD');
      if (formProps.client_due_date !== watch('client_due_date')) setValue('client_due_date', formattedDate);
      if (formProps.currency !== watch('currency')) setValue('currency', formProps.currency);
    }
  }, [formProps, setValue, watch]);

  useEffect(() => {
    if (!formProps?.currency) setValue('currency', paymentCurrencyOptions[0]?.value as string);
    if (!formProps?.payment_method) setValue('payment_method', paymentOptions[0]?.value as number);
  }, [formProps?.currency, formProps?.payment_method, paymentCurrencyOptions, setValue]);

  const onSubmit = () => {
    const data = getValues();
    const createPaymentDto = {
      ...data,
      currency: data.currency,
      commission: data.commission,
      calculator: {
        id: formProps?.calculator.id || ''
      },
      name: updatedTitle,
      ...(formProps?.id && { id: formProps.id })
    };
    createPayment(createPaymentDto)
      .unwrap()
      .then(() => {
        setSaveStatusTrueorFalse(true);
        notify(MESSAGE.UPDATED, 'success');
        handleEditPaymentAccordion(index);
      })
      .catch(() => {
        notify(MESSAGE.ERROR, 'error');
      });
  };

  const isNotEmpty = (value: unknown) => {
    return value !== null && value !== undefined && value !== '' && value !== 0;
  };

  const checkingFormForNull = () => {
    const data = getValues();
    const allFieldsValid = Object.values(data).every(isNotEmpty);
    if (allFieldsValid && saveStatusTrueorFalse) {
      setIsAddPaumentModal(true);
    } else {
      notify(MESSAGE.WARNING, 'warning');
    }
  };

  const deletePaymentAccordion = () => {
    handleDeletePaymentAccordion?.(index);
  };

  return (
    <>
      <Accordion
        title={updatedTitle}
        onEditAction={() => handleEditPaymentAccordion(index)}
        isEdit={isEdit}
        onSaveAction={() => onSubmit()}
        isOpenDefault={true}
        deleteIconState={updatedTitle === 'Данные об оплате' ? false : updatedTitle === 'Первая оплата' ? false : true}
        handleDeletePaymentAccordion={deletePaymentAccordion}
      >
        <Loading isSpin={isLoading}>
          <form className={styles.form}>
            <div className={styles.blocks}>
              <div className={styles.more_items_block}>
                <div className={styles.item_block}>
                  <label>Брутто</label>
                  <Input
                    {...register('brutto', { required: 'обязательное поле' })}
                    placeholder='0'
                    className={styles.inp_wrapper}
                    disabled={!isEdit}
                    type='number'
                  />
                </div>
                <div className={styles.item_block}>
                  <label>Нетто</label>
                  <Input
                    {...register('netto', { required: 'обязательное поле' })}
                    placeholder='0'
                    className={styles.inp_wrapper}
                    disabled={!isEdit}
                    type='number'
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
                  placeholder='0'
                  className={styles.inp_wrapper}
                  disabled={!isEdit}
                  type='number'
                />
              </div>
              <div className={styles.item_block}>
                <label>Комиссия</label>
                <Input
                  {...register('commission', { required: 'обязательное поле' })}
                  placeholder='0'
                  className={styles.inp_wrapper}
                  disabled={!isEdit}
                  type='number'
                />
              </div>
            </div>
            <div className={styles.blocks}>
              <div className={styles.more_items_block}>
                <div className={styles.item_block}>
                  <label>Курс ТО</label>
                  <Input
                    {...register('course_TO', { required: 'обязательное поле' })}
                    placeholder='0'
                    className={styles.inp_wrapper}
                    disabled={!isEdit}
                    type='number'
                  />
                </div>
                <div className={styles.item_block}>
                  <label>СО клиента</label>
                  <DatePicker
                    {...register('client_due_date', { required: 'обязательное поле' })}
                    className={styles.datepicker}
                    disabled={!isEdit}
                    defaultValue={dayjs().format('YYYY-MM-DD')}
                    datePicketType='date'
                  />
                </div>
              </div>
              <div className={styles.item_block}>
                <label>Валюта (Брутто/Нетто/Комиссия)</label>
                {paymentCurrencyOptions && (
                  <Select
                    {...register('currency', { required: 'обязательное поле' })}
                    options={paymentCurrencyOptions}
                    className={styles.select}
                    disabled={!isEdit}
                  />
                )}
              </div>
            </div>
          </form>
        </Loading>
      </Accordion>
      {isActiveTab !== 'full' && paymentAccordions.length < 5 && index === paymentAccordions.length - 1 && (
        <Icon type='plus-gray' className={styles.plusIcon} onClick={() => checkingFormForNull()} />
      )}
      {isAddPaumentModal && (
        <Modal
          isOpen={isAddPaumentModal}
          leftBtnText={'Добавить'}
          leftBtnStyle={BUTTON_TYPES.YELLOW}
          leftBtnAction={() => {
            handleAddPaymentAccordion();
            setIsAddPaumentModal(false);
          }}
          rightBtnText='Отменить'
          rightBtnStyle={BUTTON_TYPES.CANCEL}
          rightBtnAction={() => setIsAddPaumentModal(false)}
          onClose={() => setIsAddPaumentModal(false)}
        >
          <p className={styles.addPaymentModalText}>Добавить новую часть оплаты?</p>
        </Modal>
      )}
    </>
  );
};
