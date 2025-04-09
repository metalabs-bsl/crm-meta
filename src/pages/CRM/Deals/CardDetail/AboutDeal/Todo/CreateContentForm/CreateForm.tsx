import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, DatePicker, Loading, Select } from 'common/ui';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useCreateCommentMutation, useCreateReminderMutation } from 'api/admin/leads/endpoints/lead';
import { Options } from 'types/common';
import { ICreateReminderParams } from 'types/entities';
import styles from './style.module.scss';

import { useForm } from 'react-hook-form';
import { BUTTON_TYPES } from 'types/enums';

const selectOptions: Options[] = [
  {
    value: 'todo',
    label: 'Дело'
  },
  {
    value: 'comment',
    label: 'Комментарий'
  }
];

interface IProps {}

interface IFormFields extends ICreateReminderParams {
  comment_text: string;
}

export const CreateForm: FC<IProps> = () => {
  const { search } = useLocation();
  const notify = useNotify();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IFormFields>();

  const [contentType, setContentType] = useState<string>(selectOptions[0].value as string);
  const [cretateReminder, { isLoading }] = useCreateReminderMutation();
  const [createComment, { isLoading: isCommentLoading }] = useCreateCommentMutation();

  const onSubmit = (data: IFormFields) => {
    if (contentType === 'todo') {
      const updatedData = { ...data, lead_id: search.substring(1), status: 1 };
      cretateReminder(updatedData)
        .unwrap()
        .then(() => {
          reset();
          notify(MESSAGE.CREATED, 'success');
        })
        .catch(() => {
          notify(MESSAGE.ERROR, 'error');
        });
    } else {
      const updatedData = { ...data, lead_id: search.substring(1) };
      createComment(updatedData)
        .unwrap()
        .then(() => {
          reset();
          notify(MESSAGE.CREATED, 'success');
        })
        .catch(() => {
          notify(MESSAGE.ERROR, 'error');
        });
    }
  };

  const changeContentType = (text: string) => {
    setContentType(text);
    reset({ reminder_text: '', comment_text: '' });
  };

  return (
    <Loading isSpin={isLoading || isCommentLoading}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Select options={selectOptions} value={contentType} onChange={(e) => changeContentType(e.target.value)} />
        {contentType === 'todo' ? (
          <div className={styles.textareaBlock}>
            <textarea
              {...register('reminder_text', { required: 'Название дела обязательно' })}
              placeholder='Напишите что нужно сделать'
            ></textarea>
            {errors.reminder_text && <span className={styles.errorMessage}>{errors.reminder_text.message}</span>}
            <DatePicker {...register('date_to_finish', { required: 'Дата обязательна' })} className={styles.datePicker} />
            {errors.date_to_finish && <span className={styles.errorMessage}>{errors.date_to_finish.message}</span>}
          </div>
        ) : (
          <div className={styles.textareaBlock}>
            <textarea
              {...register('comment_text', { required: 'Комментарий обязателен' })}
              placeholder='Напишите что нужно сделать'
            ></textarea>
            {errors.comment_text && <span className={styles.errorMessage}>{errors.comment_text.message}</span>}
          </div>
        )}
        <div className={styles.btnsBlock}>
          <Button styleType={BUTTON_TYPES.YELLOW} text='cохранить' type='submit' />
          <Button styleType={BUTTON_TYPES.Link_BLACK} text='отменить' type='button' />
        </div>
      </form>
    </Loading>
  );
};
