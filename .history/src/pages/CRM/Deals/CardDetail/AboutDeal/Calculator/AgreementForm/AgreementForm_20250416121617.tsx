import { FC, useEffect, useState } from 'react';
import dayjs, { extend } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { DatePicker, FilePicker, Input, Loading, Select } from 'common/ui';
import { Accordion } from 'common/components';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useGetResponsibleEmployeesQuery } from 'api/admin/employees/employees.api';
import {
  useDeleteFileMutation,
  useUpdateContractMutation,
  useUploadBackPassportMutation,
  useUploadFrontPassportMutation
} from 'api/admin/leads/endpoints/calculator';
import { IUpdateContract } from 'types/entities';
import styles from './style.module.scss';

import { useForm } from 'react-hook-form';

extend(utc);

interface IProps {
  customerId: string;
  formProps: IUpdateContract | null;
}

export const AgreementForm: FC<IProps> = ({ formProps, customerId }) => {
  const [isFocused, setIsFocused] = useState(false);
  const notify = useNotify();
  const { data: responsibleOptions } = useGetResponsibleEmployeesQuery();
  const [updateContract, { isLoading }] = useUpdateContractMutation();
  const [uploadBack, { isLoading: isBackLoading }] = useUploadBackPassportMutation();
  const [uploadFront, { isLoading: isFrontLoading }] = useUploadFrontPassportMutation();
  const [deleteFile, { isLoading: isDeleteLoading, isSuccess }] = useDeleteFileMutation();
  const [isEditAgreement, setIsEditAgreement] = useState<boolean>(true);
  const [frontOfPassport, setFrontOfPassport] = useState<File | null>(null);
  const [backOfPassport, setBackOfPassport] = useState<File | null>(null);
  const [deletedFront, setDeletedFront] = useState<boolean>(false);
  const [deletedBack, setDeletedBack] = useState<boolean>(false);
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<IUpdateContract>();
  const isEditable = !isEditAgreement;
  useEffect(() => {
    if (formProps) {
      Object.keys(formProps).forEach((key) => {
        const value = formProps[key as keyof IUpdateContract];
        if (
          (key === 'customer_passportDateGiven' || key === 'customer_DOB' || key === 'customer_passportDateEnds') &&
          typeof value === 'string'
        ) {
          setValue(key as keyof IUpdateContract, dayjs.utc(value).format('YYYY-MM-DD'));
        } else if (key === 'booking_date') {
          if (typeof value === 'string' && value) {
            setValue(key as keyof IUpdateContract, dayjs.utc(value).format('YYYY-MM-DDTHH:mm'));
          } else {
            // Set the current date and time if booking_date is empty
            setValue(key as keyof IUpdateContract, dayjs.utc().add(6, 'hour').format('YYYY-MM-DDTHH:mm'));
          }
        } else {
          setValue(key as keyof IUpdateContract, formProps[key as keyof IUpdateContract]);
        }
      });
    } else {
      // Set initial value if formProps is null
      setValue('booking_date', dayjs.utc().format('YYYY-MM-DDTHH:mm'));
    }
  }, [formProps, setValue]);

  useEffect(() => {
    if (!isDeleteLoading && isSuccess) {
      setDeletedFront(false);
      setDeletedBack(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const onSubmit = (data: IUpdateContract) => {
    const hasEmptyFields = Object.entries(data).some(([value]) => !value);

    if (hasEmptyFields) {
      Object.entries(data).forEach(([key, value]) => {
        if (!value) {
          setError(key as keyof IUpdateContract, { message: 'Это поле обязательно' });
        }
      });
      return;
    }

    if (deletedFront && formProps?.passport_front[0]?.id) {
      deleteFile(formProps?.passport_front[0].id);
    }

    if (deletedBack && formProps?.passport_back[0]?.id) {
      deleteFile(formProps?.passport_back[0].id);
    }

    if (backOfPassport) {
      const backformData = new FormData();
      backformData.append('file', backOfPassport);
      uploadBack({ body: backformData, customerId });
    }

    if (frontOfPassport) {
      const frontData = new FormData();
      frontData.append('file', frontOfPassport);
      uploadFront({ body: frontData, customerId });
    }

    updateContract(getValues())
      .unwrap()
      .then(() => {
        setIsEditAgreement(!isEditAgreement);
        notify(MESSAGE.UPDATED, 'success');
      })
      .catch(() => {
        notify(MESSAGE.ERROR, 'error');
      });
  };
  useEffect(() => {
    if (isFocused) {
      const todayDate = dayjs().format('DD/MM/YYYY');
      const currentValue = getValues('contract_number');
      if (!currentValue) {
        setValue('contract_number' as keyof IUpdateContract, `${todayDate} `);
      }
    }
  }, [isFocused, getValues, setValue]);  
  return (
    <Accordion
      title='Договор'
      onEditAction={() => setIsEditAgreement(!isEditAgreement)}
      isEdit={isEditAgreement}
      onSaveAction={handleSubmit(onSubmit)}
      isOpenDefault={true}
    >
      <Loading isSpin={isLoading || isBackLoading || isFrontLoading || isDeleteLoading}>
        <form className={styles.form}>
          <div className={styles.blocks}>
            <div className={styles.item_block}>
              <label>Номер договора</label>
              <Input
                {...register('contract_number', { required: 'обязательное поле' })}
                placeholder='Не заполнено'
                className={styles.inp_wrapper}
                disabled={isEditable}
                type='text'
                onFocus={() => {
                  setIsFocused(true);
                }}
                onBlur={() => {
                  setIsFocused(false);
                }}
              />
            </div>
            <div className={styles.more_items_block}>
              <div className={styles.item_block}>
                <label>ID паспорта</label>
                <Input
                  {...register('customer_passport', { required: 'обязательное поле' })}
                  placeholder='Не заполнено'
                  className={styles.inp_wrapper}
                  disabled={isEditable}
                />
                {errors.customer_passport && <span className={styles.error}>{errors.customer_passport.message}</span>}
              </div>
              <div className={styles.item_block}>
                <label>ИНН</label>
                <Input
                  {...register('customer_inn', { required: 'обязательное поле' })}
                  placeholder='Не заполнено'
                  className={styles.inp_wrapper}
                  disabled={isEditable}
                />
                {errors.customer_inn && <span className={styles.error}>{errors.customer_inn.message}</span>}
              </div>
            </div>
            <div className={styles.item_block}>
              <label>Адрес</label>
              <Input
                {...register('customer_address', { required: 'обязательное поле' })}
                placeholder='Не заполнено'
                className={styles.inp_wrapper}
                disabled={isEditable}
              />
              {errors.customer_address && <span className={styles.error}>{errors.customer_address.message}</span>}
            </div>
            <div className={styles.item_block} style={{ height: '70px', display: 'inline-block' }}></div>
            <div className={styles.item_block}>
              <label>Передняя сторона паспорта</label>
              <FilePicker
                onChange={setFrontOfPassport}
                disabled={isEditable}
                defaultValue={formProps?.passport_front[0]}
                onDelete={() => setDeletedFront(true)}
              />
            </div>
          </div>
          <div className={styles.blocks}>
            <div className={styles.item_block}>
              <label>ФИО</label>
              <Input
                {...register('customer_fullname', { required: 'обязательное поле' })}
                placeholder='Не заполнено'
                className={styles.inp_wrapper}
                disabled={isEditable}
              />
              {errors.customer_fullname && <span className={styles.error}>{errors.customer_fullname.message}</span>}
            </div>
            <div className={styles.item_block}>
              <label>Орган выдавший документ</label>
              <Input
                {...register('customer_issuingAuthority', { required: 'обязательное поле' })}
                placeholder='Не заполнено'
                className={styles.inp_wrapper}
                disabled={isEditable}
              />
              {errors.customer_issuingAuthority && <span className={styles.error}>{errors.customer_issuingAuthority.message}</span>}
            </div>
            <div className={styles.item_block}>
              <label>Дата выдачи паспорта</label>
              <DatePicker
                {...register('customer_passportDateGiven', { required: 'обязательное поле' })}
                className={styles.datepicker}
                disabled={isEditable}
                datePicketType='date'
              />
              {errors.customer_passportDateGiven && <span className={styles.error}>{errors.customer_passportDateGiven.message}</span>}
            </div>
            <div className={styles.item_block}>
              <label>Дата окончания паспорта</label>
              <DatePicker
                {...register('customer_passportDateEnds', { required: 'обязательное поле' })}
                className={styles.datepicker}
                disabled={isEditable}
                datePicketType='date'
              />
              {errors.customer_passportDateEnds && <span className={styles.error}>{errors.customer_passportDateEnds.message}</span>}
            </div>
            <div className={styles.item_block}>
              <label>Задняя сторона паспорта</label>
              <FilePicker
                onChange={setBackOfPassport}
                disabled={isEditable}
                defaultValue={formProps?.passport_back[0]}
                onDelete={() => setDeletedBack(true)}
              />
            </div>
          </div>
          <div className={styles.blocks}>
            <div className={styles.item_block}>
              <label>Ответственный</label>
              {responsibleOptions && (
                <Select
                  {...register('responsible_id', { required: 'обязательное поле' })}
                  options={responsibleOptions}
                  disabled={isEditable}
                  className={styles.inp_wrapper}
                />
              )}
              {errors.responsible_id && <span className={styles.error}>{errors.responsible_id.message}</span>}
            </div>
            <div className={styles.item_block}>
              <label>Дата бронирования</label>
              <DatePicker
                {...register('booking_date', { required: 'обязательное поле' })}
                className={styles.datepicker}
                disabled={isEditable}
              />
              {errors.booking_date && <span className={styles.error}>{errors.booking_date.message}</span>}
            </div>
            <div className={styles.item_block}>
              <label>Дата рождения клиента</label>
              <DatePicker
                {...register('customer_DOB', { required: 'Дата рождения клиента обязательна' })}
                disabled={isEditable}
                className={styles.datepicker}
                datePicketType='date'
              />
              {errors.customer_DOB && <span className={styles.error}>{errors.customer_DOB.message}</span>}
            </div>
          </div>
        </form>
      </Loading>
    </Accordion>
  );
};
