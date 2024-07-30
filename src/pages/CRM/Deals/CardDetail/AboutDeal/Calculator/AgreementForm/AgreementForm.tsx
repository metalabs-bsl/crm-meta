import { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { DatePicker, Input, Loading, Select } from 'common/ui';
import { Accordion, MultipleFilePicker } from 'common/components';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useGetResponsibleEmployeesQuery } from 'api/admin/employees/employees.api';
import { useUpdateContractMutation } from 'api/admin/leads/endpoints/calculator';
import { IUpdateContract } from 'types/entities';
import styles from './style.module.scss';

import { useForm } from 'react-hook-form';

interface IProps {
  formProps: IUpdateContract | null;
}

export const AgreementForm: FC<IProps> = ({ formProps }) => {
  const notify = useNotify();
  const { data: responsibleOptions } = useGetResponsibleEmployeesQuery();
  const [updateContract, { isLoading }] = useUpdateContractMutation();
  const [isEditAgreement, setIsEditAgreement] = useState<boolean>(false);
  const [passportFiles, setPassportFiles] = useState<File[]>([]);
  const { register, getValues, setValue } = useForm<IUpdateContract>();
  const isEditable = !isEditAgreement;

  useEffect(() => {
    if (formProps) {
      if (formProps.passports) {
        // console.log(formProps.passports);
        //   setPassportFiles(formProps.passports);
      }
      delete formProps.passports;
      Object.keys(formProps).forEach((key) => {
        const value = formProps[key as keyof IUpdateContract];
        if ((key === 'booking_date' || key === 'customer_passportDateGiven') && typeof value === 'string') {
          setValue(key as keyof IUpdateContract, dayjs(value).format('YYYY-MM-DDTHH:mm'));
        } else {
          setValue(key as keyof IUpdateContract, formProps[key as keyof IUpdateContract]);
        }
      });
    }
  }, [formProps, setValue]);

  const onSubmit = () => {
    const data = getValues();
    const formData = new FormData();
    passportFiles.forEach((file) => formData.append('passports', file));
    formData.append('leadsCalculatorContract', JSON.stringify(data));
    updateContract(formData)
      .unwrap()
      .then(() => {
        setIsEditAgreement(!isEditAgreement);
        notify(MESSAGE.UPDATED, 'success');
      })
      .catch(() => {
        notify(MESSAGE.ERROR, 'error');
      });

    console.log(passportFiles);
    console.log('Form Data:', data);
  };

  return (
    <Accordion title='Договор' onEditAction={() => setIsEditAgreement(!isEditAgreement)} isEdit={isEditAgreement} onSaveAction={onSubmit}>
      <Loading isSpin={isLoading}>
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
              <label>Паспорт</label>
              <div className={styles.password_wrapper}>
                <MultipleFilePicker files={passportFiles} editable={isEditable} onFilesChange={setPassportFiles} />
              </div>
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
              />
            </div>
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
          </div>
          <div className={styles.blocks}>
            <div className={styles.item_block}>
              <label>Дата бронирования</label>
              <DatePicker
                {...register('booking_date', { required: 'обязательное поле' })}
                className={styles.datepicker}
                disabled={isEditable}
              />
            </div>
          </div>
        </form>
      </Loading>
    </Accordion>
  );
};
