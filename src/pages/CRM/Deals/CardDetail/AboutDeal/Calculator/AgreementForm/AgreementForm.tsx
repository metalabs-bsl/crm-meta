import { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
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

interface IProps {
  customerId: string;
  formProps: IUpdateContract | null;
}

export const AgreementForm: FC<IProps> = ({ formProps, customerId }) => {
  const notify = useNotify();
  const { data: responsibleOptions } = useGetResponsibleEmployeesQuery();
  const [updateContract, { isLoading }] = useUpdateContractMutation();
  const [uploadBack, { isLoading: isBackLoading }] = useUploadBackPassportMutation();
  const [uploadFront, { isLoading: isFrontLoading }] = useUploadFrontPassportMutation();
  const [deleteFile, { isLoading: isDeleteLoading, isSuccess }] = useDeleteFileMutation();
  const [isEditAgreement, setIsEditAgreement] = useState<boolean>(false);
  const [frontOfPassport, setFrontOfPassport] = useState<File | null>(null);
  const [backOfPassport, setBackOfPassport] = useState<File | null>(null);
  const [deletedFront, setDeletedFront] = useState<boolean>(false);
  const [deletedBack, setDeletedBack] = useState<boolean>(false);
  const { register, getValues, setValue } = useForm<IUpdateContract>();
  const isEditable = !isEditAgreement;

  useEffect(() => {
    if (formProps) {
      Object.keys(formProps).forEach((key) => {
        const value = formProps[key as keyof IUpdateContract];
        if ((key === 'customer_passportDateGiven' || key === 'customer_DOB') && typeof value === 'string') {
          setValue(key as keyof IUpdateContract, dayjs(value).format('YYYY-MM-DD'));
        } else if (key === 'booking_date' && typeof value === 'string') {
          setValue(key as keyof IUpdateContract, dayjs(value).format('YYYY-MM-DDTHH:mm'));
        } else {
          setValue(key as keyof IUpdateContract, formProps[key as keyof IUpdateContract]);
        }
      });
    }
  }, [formProps, setValue]);

  useEffect(() => {
    if (!isDeleteLoading && isSuccess) {
      setDeletedFront(false);
      setDeletedBack(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const onSubmit = () => {
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

  return (
    <Accordion title='Договор' onEditAction={() => setIsEditAgreement(!isEditAgreement)} isEdit={isEditAgreement} onSaveAction={onSubmit}>
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
                type='number'
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
              </div>
              <div className={styles.item_block}>
                <label>ИНН</label>
                <Input
                  {...register('customer_inn', { required: 'обязательное поле' })}
                  placeholder='Не заполнено'
                  className={styles.inp_wrapper}
                  disabled={isEditable}
                />
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
            </div>
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
            </div>
            <div className={styles.item_block}>
              <label>Орган выдавший документ</label>
              <Input
                {...register('customer_issuingAuthority', { required: 'обязательное поле' })}
                placeholder='Не заполнено'
                className={styles.inp_wrapper}
                disabled={isEditable}
              />
            </div>
            <div className={styles.item_block}>
              <label>Дата выдачи</label>
              <DatePicker
                {...register('customer_passportDateGiven', { required: 'обязательное поле' })}
                className={styles.datepicker}
                disabled={isEditable}
                datePicketType='date'
              />
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
            </div>
            <div className={styles.item_block}>
              <label>Дата бронирования</label>
              <DatePicker
                {...register('booking_date', { required: 'обязательное поле' })}
                className={styles.datepicker}
                disabled={isEditable}
              />
            </div>
            <div className={styles.item_block}>
              <label>Дата рождения клиента</label>
              <DatePicker
                {...register('customer_DOB', { required: 'Дата рождения клиента обязательна' })}
                disabled={isEditable}
                className={styles.datepicker}
                datePicketType='date'
              />
            </div>
          </div>
        </form>
      </Loading>
    </Accordion>
  );
};
