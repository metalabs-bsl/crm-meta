import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Button, FilePicker, Input, Loading, TextEditor } from 'common/ui';
import { Modal } from 'common/components';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useGetSignQuery, useSendMailMutation } from 'api/admin/mail/mail.api';
import { ISendMail } from 'types/entities';
import styles from './style.module.scss';

import { useForm } from 'react-hook-form';
import { BUTTON_TYPES } from 'types/enums';

interface ModalProps {
  setModalActive: (active: boolean) => void;
  isModalActive: boolean;
}

const MessageModal: FC<ModalProps> = ({ isModalActive = false, setModalActive }) => {
  const notify = useNotify();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ISendMail>();
  const [text, setText] = useState<string>('');
  const [textError, setTextError] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sendMail, { isLoading }] = useSendMailMutation();
  const { data: signData } = useGetSignQuery();

  useEffect(() => {
    if (signData) {
      setValue('sign', signData);
    }
  }, [setValue, signData]);

  const onSubmit = (data: ISendMail) => {
    if (text.length) {
      setTextError(false);
      const updatedData = {
        ...data,
        text
      };
      const formData = new FormData();
      if (selectedFile) {
        formData.append('attachments', selectedFile);
      }
      formData.append('message_options', JSON.stringify(updatedData));
      sendMail(formData)
        .unwrap()
        .then(() => {
          notify(MESSAGE.CREATED, 'success');
          setModalActive(false);
        })
        .catch((error) => {
          notify(error.message, 'error');
        });
    } else {
      setTextError(true);
    }
  };

  return (
    <Modal isOpen={isModalActive} onClose={() => setModalActive(false)} className={styles.wrapper}>
      <Loading isSpin={isLoading}>
        <form className={styles.modal_wrapper} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.header_title}>
            <span>Новое сообщение</span>
            <Button text='Отправить' styleType={BUTTON_TYPES.YELLOW} className={styles.sendBtn} />
          </div>
          <div className={styles.modal_content}>
            <div>
              <label>Кому</label>
              <Input
                className={classNames(styles.input_sendMessage, styles.inp_with_icon)}
                prevIcon='userIcon'
                placeholder='Введите кому отправить'
                {...register('to', { required: 'Поле обязательно' })}
              />
              {errors.to && <span className={styles.error}>{errors.to.message}</span>}
            </div>
            <div>
              <label>Тема</label>
              <Input
                className={styles.input_sendMessage}
                placeholder='Введите кому отправить'
                {...register('subject', { required: 'Поле обязательно' })}
              />
              {errors.subject && <span className={styles.error}>{errors.subject.message}</span>}
            </div>
            <TextEditor placeholder='Напишите ваше сообщение' className={styles.editor} onChange={setText} />
            {textError && <span className={styles.error}>{'Поле обязательно'}</span>}
            <div>
              <label>Прикрепить файл</label>
              <FilePicker onChange={setSelectedFile} />
            </div>
            <div className={styles.modal_field_message}>
              <label>Подпись</label>
              <textarea
                className={styles.team}
                rows={5}
                cols={30}
                defaultValue={signData}
                {...register('sign', { required: 'Поле обязательно' })}
              />
              {errors.sign && <span className={styles.error}>{errors.sign.message}</span>}
            </div>
          </div>
        </form>
      </Loading>
    </Modal>
  );
};

export default MessageModal;
