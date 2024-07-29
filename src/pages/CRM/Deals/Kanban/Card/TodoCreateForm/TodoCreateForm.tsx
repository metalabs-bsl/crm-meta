import { FC } from 'react';
import { Button, DatePicker, Loading } from 'common/ui';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useCreateReminderMutation } from 'api/admin/leads/endpoints/lead';
import { ICreateReminderParams } from 'types/entities';
import styles from './style.module.scss';

import { useForm } from 'react-hook-form';
import { BUTTON_TYPES } from 'types/enums';

interface IProps {
  lead_id: string;
  onCancel: () => void;
}

export const TodoCreateForm: FC<IProps> = ({ lead_id, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ICreateReminderParams>();
  const notify = useNotify();
  const [cretateReminder, { isLoading }] = useCreateReminderMutation();

  const onSubmit = (data: ICreateReminderParams) => {
    const updatedData = { ...data, lead_id, status: 1 };
    cretateReminder(updatedData)
      .unwrap()
      .then(() => {
        notify(MESSAGE.CREATED, 'success');
        onCancel();
      })
      .catch(() => {
        notify(MESSAGE.ERROR, 'error');
      });
  };

  return (
    <Loading isSpin={isLoading}>
      <form className={styles.textareaBlock} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.wrapper}>
          <textarea
            {...register('reminder_text', { required: 'Название доски обязательно' })}
            placeholder='Напишите что нужно сделать'
          ></textarea>
          {errors.reminder_text && <span className={styles.errorMessage}>{errors.reminder_text.message}</span>}
          <DatePicker {...register('date_to_finish', { required: 'Название доски обязательно' })} className={styles.datePicker} />
          {errors.date_to_finish && <span className={styles.errorMessage}>{errors.date_to_finish.message}</span>}
        </div>
        <div className={styles.modalBtnWrapper}>
          <Button text='сохранить' styleType={BUTTON_TYPES.YELLOW} type='submit' />
          <Button text='отменить' styleType={BUTTON_TYPES.Link_BLACK} type='button' onClick={onCancel} />
        </div>
      </form>
    </Loading>
  );
};
