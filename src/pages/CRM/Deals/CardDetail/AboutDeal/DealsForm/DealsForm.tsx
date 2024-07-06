import { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import cn from 'classnames';
import { Button, DatePicker, Icon, Input, Loading, Select } from 'common/ui';
import { useAppSelector, useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useGetResponsibleEmployeesQuery } from 'api/admin/employees/employees.api';
import { useCreateLeadMutation, useGetSourseLeadQuery, useUpdateLeadMutation } from 'api/admin/leads/leads.api';
import { sidebarSelectors } from 'api/admin/sidebar/sidebar.selectors';
import { ICreateLeadParams } from 'types/entities';
import styles from './styles.module.scss';

import { SubmitHandler, useForm } from 'react-hook-form';
import { BUTTON_TYPES } from 'types/enums';

interface IProps {
  leadId?: string;
  formProps?: ICreateLeadParams;
}

export const DealsForm: FC<IProps> = ({ formProps, leadId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<ICreateLeadParams>({
    defaultValues: formProps || {}
  });

  const { isNewDeal, column_id } = useAppSelector(sidebarSelectors.sidebar);
  const [isEdit, setIsEdit] = useState<boolean>(isNewDeal);
  const { data: responsibleOptions, isFetching: isResponsibleFetching } = useGetResponsibleEmployeesQuery();
  const { data: sourceOptions, isFetching: isSourceFetching } = useGetSourseLeadQuery();
  const [createDeal, { isLoading: isCreateLoading }] = useCreateLeadMutation();
  const [updateLead, { isLoading: isUpdateLoading }] = useUpdateLeadMutation();
  const notify = useNotify();

  useEffect(() => {
    if (formProps) {
      Object.keys(formProps).forEach((key) => {
        if (key === 'customer_DOB' || key === 'date_created') {
          setValue(key as keyof ICreateLeadParams, dayjs(formProps[key as keyof ICreateLeadParams]).format('YYYY-MM-DDTHH:mm'));
        } else {
          setValue(key as keyof ICreateLeadParams, formProps[key as keyof ICreateLeadParams]);
        }
      });
    }
  }, [formProps, setValue]);

  useEffect(() => {
    setIsEdit(isNewDeal);
  }, [isNewDeal]);

  const onsubmit: SubmitHandler<ICreateLeadParams> = (data) => {
    if (formProps && leadId) {
      updateLead({ body: data, id: leadId })
        .unwrap()
        .then(() => {
          notify(MESSAGE.SUCCESS, 'success');
          setIsEdit(false);
        });
    } else {
      createDeal({ ...data, column_id: column_id })
        .unwrap()
        .then(() => {
          notify(MESSAGE.SUCCESS, 'success');
          setIsEdit(false);
          reset();
        });
    }
  };

  return (
    <form className={cn(styles.dealsForm, { [styles.isNewDeal]: isNewDeal })} onSubmit={handleSubmit(onsubmit)}>
      <Loading isSpin={isResponsibleFetching || isSourceFetching || isCreateLoading || isUpdateLoading}>
        <div className={styles.head}>
          <span className={styles.title}>О сделке</span>
          {isEdit ? (
            <div className={styles.btnsBlock}>
              <Button styleType={BUTTON_TYPES.YELLOW} text='сохранить' type='submit' />
              <Button styleType={BUTTON_TYPES.Link_BLACK} text='отменить' onClick={() => setIsEdit(false)} />
            </div>
          ) : (
            <Icon type='edit' onClick={() => setIsEdit(true)} className={styles.edit} />
          )}
        </div>
        <div className={styles.formItems}>
          <div className={styles.inpBlock}>
            <label>Наименование</label>
            <Input {...register('lead_name', { required: 'Наименование обязательно' })} className={styles.inp} disabled={!isEdit} />
            {errors.lead_name && <span className={styles.error}>{errors.lead_name.message}</span>}
          </div>
          <div className={styles.inpBlock}>
            <label>Клиент</label>
            <Input {...register('customer_name', { required: 'Клиент обязателен' })} className={styles.inp} disabled={!isEdit} />
            {errors.customer_name && <span className={styles.error}>{errors.customer_name.message}</span>}
          </div>
          <div className={styles.inpBlock}>
            <label>Номер телефона</label>
            <Input {...register('customer_phone', { required: 'Номер телефона обязателен' })} className={styles.inp} disabled={!isEdit} />
            {errors.customer_phone && <span className={styles.error}>{errors.customer_phone.message}</span>}
          </div>
          <div className={styles.inpBlock}>
            <label>Город проживания</label>
            <Input {...register('city', { required: 'Город проживания обязателен' })} className={styles.inp} disabled={!isEdit} />
            {errors.city && <span className={styles.error}>{errors.city.message}</span>}
          </div>
          {sourceOptions && (
            <div className={styles.inpBlock}>
              <label>Источник</label>
              <Select
                {...register('source_id', { required: 'Источник обязателен' })}
                options={sourceOptions}
                disabled={!isEdit}
                className={styles.select}
              />
              {errors.source_id && <span className={styles.error}>{errors.source_id.message}</span>}
            </div>
          )}
          <div className={styles.moreWrapper}>
            <div className={styles.inpBlock}>
              <label>Дата рождения клиента</label>
              <DatePicker
                {...register('customer_DOB', { required: 'Дата рождения клиента обязательна' })}
                disabled={!isEdit}
                className={styles.date}
              />
              {errors.customer_DOB && <span className={styles.error}>{errors.customer_DOB.message}</span>}
            </div>
            <div className={styles.inpBlock}>
              <label>Дата создания сделки</label>
              <DatePicker
                {...register('date_created', { required: 'Дата создания сделки обязательна' })}
                disabled={!isEdit}
                className={styles.date}
              />
              {errors.date_created && <span className={styles.error}>{errors.date_created.message}</span>}
            </div>
          </div>
          {responsibleOptions && (
            <div className={styles.inpBlock}>
              <label>Ответственный</label>
              <Select
                {...register('responsible_employee_id', { required: 'Ответственный обязателен' })}
                options={responsibleOptions}
                disabled={!isEdit}
                className={styles.select}
              />
              {errors.responsible_employee_id && <span className={styles.error}>{errors.responsible_employee_id.message}</span>}
            </div>
          )}
        </div>
      </Loading>
    </form>
  );
};
