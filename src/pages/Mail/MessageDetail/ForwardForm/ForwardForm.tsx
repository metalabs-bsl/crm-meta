import { FC } from 'react';
import { Button, Input, Loading } from 'common/ui';
import { useNotify } from 'common/hooks';
import { useForwardMessageMutation } from 'api/admin/mail/mail.api';
import styles from './style.module.scss';

import { useForm } from 'react-hook-form';
import { BUTTON_TYPES } from 'types/enums';

interface IFormFields {
  mail_to: string;
}

interface IProps {
  mail_id: string;
  onClose: () => void;
}

export const ForwardForm: FC<IProps> = ({ onClose, mail_id }) => {
  const { register, handleSubmit } = useForm<IFormFields>();
  const notify = useNotify();
  const [forwardMessage, { isLoading }] = useForwardMessageMutation();

  const onSubmit = (data: IFormFields) => {
    const { mail_to } = data;
    forwardMessage({ mail_to, mail_id })
      .unwrap()
      .then(() => {
        notify('Письмо переслано!', 'success');
        onClose();
      });
  };

  return (
    <Loading isSpin={isLoading}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <label htmlFor=''>Получатель</label>
          <Input placeholder='Введите email' className={styles.inp_wrapper} {...register('mail_to', { required: 'Поле обязательно' })} />
        </div>
        <Button text='Отправить' styleType={BUTTON_TYPES.YELLOW} />
      </form>
    </Loading>
  );
};
