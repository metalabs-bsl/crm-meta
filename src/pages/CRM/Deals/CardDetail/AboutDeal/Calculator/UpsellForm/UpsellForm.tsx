import { FC, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { DatePicker, Input, Select } from 'common/ui';
import { Accordion } from 'common/components';
import { useNotify } from 'common/hooks';
import { MESSAGE, paymentOptions } from 'common/constants';
import { useSetAdditionalPaymentMutation } from 'api/admin/leads/endpoints/calculator';
import { useGetPaymentCurrencyQuery } from 'api/admin/paymentCurrency/paymentCurrency.api';
import { Options } from 'types/common';
import { IAdditionalPayment } from 'types/entities/leads';
import styles from './style.module.scss';

import { useForm } from 'react-hook-form';

interface IProps {
  title?: string;
  calcId?: string;
  formProps: IAdditionalPayment;
}

export const UpsellForm: FC<IProps> = ({ title, calcId, formProps }) => {
  const [isEditUpsell, setIsEditUpsell] = useState<boolean>(false);
  const isEditable = !isEditUpsell;
  const { register, getValues, setValue } = useForm<IAdditionalPayment>();
  const [postPayment] = useSetAdditionalPaymentMutation();
  const { data } = useGetPaymentCurrencyQuery();
  const notify = useNotify();

  const paymentCurrencyOptions = useMemo<Options[]>(() => {
    return (
      data?.map((currency) => ({
        value: currency.id,
        label: currency?.currency || ''
      })) || []
    );
  }, [data]);

  useEffect(() => {
    if (formProps) {
      Object.keys(formProps).forEach((key) => {
        const value = formProps[key as keyof IAdditionalPayment];
        if (key === 'client_due_date' && typeof value === 'string') {
          setValue(key as keyof IAdditionalPayment, dayjs(value).format('YYYY-MM-DDTHH:mm'));
        } else {
          setValue(key as keyof IAdditionalPayment, formProps[key as keyof IAdditionalPayment]);
        }
      });
    }
  }, [formProps, setValue]);

  useEffect(() => {
    if (!formProps?.currency) setValue('currency', paymentCurrencyOptions[0]?.value as string);
    if (!formProps?.payment_method) setValue('payment_method', paymentOptions[0]?.value as string);
  }, [formProps?.currency, formProps?.payment_method, paymentCurrencyOptions, setValue]);

  const onSubmit = () => {
    if (calcId) {
      const data = getValues();
      const updatedData: IAdditionalPayment = {
        ...data,
        id: formProps.id,
        name: formProps.name,
        calculator: {
          id: calcId
        }
      };
      postPayment(updatedData)
        .unwrap()
        .then(() => {
          notify(MESSAGE.UPDATED, 'success');
          setIsEditUpsell(!isEditUpsell);
        })
        .catch(() => {
          notify(MESSAGE.ERROR, 'error');
        });
    }
  };

  return (
    <Accordion
      title={`Доп продажа - ${title}`}
      onEditAction={() => setIsEditUpsell(!isEditUpsell)}
      isEdit={isEditUpsell}
      onSaveAction={onSubmit}
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
                disabled={isEditable}
                type='number'
              />
            </div>
            <div className={styles.item_block}>
              <label>Нетто</label>
              <Input
                {...register('netto', { required: 'обязательное поле' })}
                placeholder='Не заполнено'
                className={styles.inp_wrapper}
                disabled={isEditable}
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
              disabled={isEditable}
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
              disabled={isEditable}
              type='number'
            />
          </div>
          <div className={styles.item_block}>
            <label>Комиссия</label>
            <Input
              {...register('commission', { required: 'обязательное поле' })}
              placeholder='Не заполнено'
              className={styles.inp_wrapper}
              disabled={isEditable}
              type='number'
            />
          </div>
        </div>
        <div className={styles.blocks}>
          <div className={styles.more_items_block}>
            <div className={styles.item_block}>
              <label>Курс ТО (сом)</label>
              <Input
                {...register('course_TO', { required: 'обязательное поле' })}
                placeholder='Не заполнено'
                className={styles.inp_wrapper}
                disabled={isEditable}
                type='number'
              />
            </div>
            <div className={styles.item_block}>
              <label>СО клиента</label>
              <DatePicker
                {...register('client_due_date', { required: 'обязательное поле' })}
                className={styles.datepicker}
                disabled={isEditable}
              />
            </div>
          </div>
          <div className={styles.item_block}>
            <label>Валюта (Брутто/Нетто/Комиссия)</label>
            <Select
              {...register('currency', { required: 'обязательное поле' })}
              options={paymentCurrencyOptions}
              className={styles.select}
              disabled={isEditable}
            />
          </div>
        </div>
      </form>
    </Accordion>
  );
};
