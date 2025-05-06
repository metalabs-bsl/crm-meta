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

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ICalcPayment>({
    defaultValues: {
      brutto: '',
      netto: '',
      exchange_rate: '',
      commission: '',
      course_TO: '',
      client_due_date: '',
      currency: '',
      payment_method: ''
    }
  });
  const [createPayment, { isLoading }] = useCreatePaymentMutation();
  const updatedTitle = index === 0 ? (isActiveTab === 'partial' ? title || '' : 'Данные об оплате') : title;

  const brutto = watch('brutto');
  const course_TO = watch('course_TO');
  const netto = watch('netto');

  useEffect(() => {
    if (brutto && course_TO) {
      const numBrutto = Number(brutto);
      const numCourse = Number(course_TO);
      if (!isNaN(numBrutto) && !isNaN(numCourse)) {
        const calculatedValue = numBrutto * numCourse;
        setValue('exchange_rate', calculatedValue ? Number(calculatedValue.toFixed(2)) : '');
      }
    } else {
      setValue('exchange_rate', '');
    }
  }, [brutto, course_TO, setValue]);

  useEffect(() => {
    if (brutto && netto) {
      const numBrutto = Number(brutto);
      const numNetto = Number(netto);
      if (!isNaN(numBrutto) && !isNaN(numNetto)) {
        const calculatedValue = numBrutto - numNetto;
        setValue('commission', calculatedValue ? Number(calculatedValue.toFixed(2)) : '');
      }
    } else {
      setValue('commission', '');
    }
  }, [brutto, netto, setValue]);

  useEffect(() => {
    if (formProps) {
      if (formProps.brutto !== watch('brutto')) setValue('brutto', formProps.brutto || '');
      if (formProps.netto !== watch('netto')) setValue('netto', formProps.netto || '');
      if (formProps.payment_method !== watch('payment_method')) setValue('payment_method', formProps.payment_method || '');
      if (formProps.exchange_rate !== watch('exchange_rate')) setValue('exchange_rate', formProps.exchange_rate || '');
      if (formProps.commission !== watch('commission')) setValue('commission', formProps.commission || '');
      if (formProps.course_TO !== watch('course_TO')) setValue('course_TO', formProps.course_TO || '');
      const formattedDate = dayjs.utc(formProps.client_due_date).isValid()
        ? dayjs.utc(formProps.client_due_date).format('YYYY-MM-DD')
        : dayjs().format('YYYY-MM-DD');
      if (formProps.client_due_date !== watch('client_due_date')) setValue('client_due_date', formattedDate);
      if (formProps.currency !== watch('currency')) setValue('currency', formProps.currency || '');
    }
  }, [formProps, setValue, watch]);

  useEffect(() => {
    if (!formProps?.currency) setValue('currency', String(paymentCurrencyOptions[0]?.value || ''));
    if (!formProps?.payment_method) setValue('payment_method', Number(paymentOptions[0]?.value || 0));
  }, [formProps?.currency, formProps?.payment_method, paymentCurrencyOptions, setValue]);

  const onSubmit = handleSubmit((data) => {
    console.log('Данные для отправки:', data);

    const createPaymentDto = {
      ...data,
      brutto: data.brutto ? Number(data.brutto) : 0,
      netto: data.netto ? Number(data.netto) : 0,
      exchange_rate: data.exchange_rate ? Number(data.exchange_rate) : 0,
      commission: data.commission ? Number(data.commission) : 0,
      course_TO: data.course_TO ? Number(data.course_TO) : 0,
      currency: data.currency,
      calculator: {
        id: formProps?.calculator.id || ''
      },
      name: updatedTitle,
      payment_method: Number(data.payment_method) as number,
      client_due_date: data.client_due_date, // Значение "СО клиента"
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
  });

  const isNotEmpty = (value: unknown) => {
    return value !== null && value !== undefined && value !== '';
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
                  <Input {...register('brutto')} placeholder='0' className={styles.inp_wrapper} disabled={!isEdit} type='number' />
                </div>
                <div className={styles.item_block}>
                  <label>Нетто</label>
                  <Input {...register('netto')} placeholder='0' className={styles.inp_wrapper} disabled={!isEdit} type='number' />
                </div>
              </div>
              <div className={styles.item_block}>
                <label>Способ оплаты</label>
                <Select {...register('payment_method')} options={paymentOptions} className={styles.select} disabled={!isEdit} />
              </div>
            </div>
            <div className={styles.blocks}>
              <div className={styles.item_block}>
                <label>Валюта (сом)</label>
                <Input {...register('exchange_rate')} placeholder='0' className={styles.inp_wrapper} disabled={!isEdit} type='number' />
              </div>
              <div className={styles.item_block}>
                <label>Комиссия</label>
                <Input {...register('commission')} placeholder='0' className={styles.inp_wrapper} disabled={!isEdit} type='number' />
              </div>
            </div>
            <div className={styles.blocks}>
              <div className={styles.more_items_block}>
                <div className={styles.item_block}>
                  <label>Курс ТО</label>
                  <Input {...register('course_TO')} placeholder='0' className={styles.inp_wrapper} disabled={!isEdit} type='number' />
                </div>
                <div className={styles.item_block}>
                  <label>СО клиента</label>
                  <DatePicker
                    {...register('client_due_date', { required: 'Поле обязательно для заполнения' })}
                    className={styles.datepicker}
                    disabled={!isEdit}
                    defaultValue={dayjs().format('YYYY-MM-DD')}
                    datePicketType='date'
                  />
                  {errors.client_due_date && <p className={styles.error}>{errors.client_due_date.message}</p>}
                </div>
              </div>
              <div className={styles.item_block}>
                <label>Валюта (Брутто/Нетто/Комиссия)</label>
                {paymentCurrencyOptions && (
                  <Select {...register('currency')} options={paymentCurrencyOptions} className={styles.select} disabled={!isEdit} />
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
