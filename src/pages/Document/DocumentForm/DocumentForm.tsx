import { FC, useState } from 'react';
import { Button, FilePicker, Input, Loading } from 'common/ui';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useCreateDocMutation } from 'api/admin/document/document.api';
import styles from './styles.module.scss';

import { SubmitHandler, useForm } from 'react-hook-form';
import { BUTTON_TYPES } from 'types/enums';

interface DocumentFormProps {
  onClose: () => void;
  activeTab: string;
}

interface FormValues {
  documentNumber?: string;
  documentName?: string;
}

export const DocumentForm: FC<DocumentFormProps> = ({ onClose, activeTab }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>();
  const [file, setFile] = useState<File>();
  const [createDoc, { isLoading }] = useCreateDocMutation();
  const notify = useNotify();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      createDoc({
        body: formData,
        contract_number: activeTab === 'tab2' ? null : data.documentNumber,
        name: activeTab === 'tab1' ? null : data.documentName
      })
        .unwrap()
        .then(() => {
          notify(MESSAGE.CREATED, 'success');
          reset();
          onClose();
        })
        .catch((er) => {
          notify(er.data.message, 'error');
        });
    }
  };

  return (
    <Loading isSpin={isLoading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.filePickerWrapper}>
          <FilePicker
            onChange={(file) => {
              if (file) {
                setFile(file);
              }
            }}
            className={styles.nameFilePicker}
          />
        </div>
        {activeTab === 'tab1' ? (
          <div className={styles.inputWrapper} style={{ display: 'flex' }}>
            <label htmlFor='documentNumber'>Номер договора:</label>
            <Input
              type='number'
              placeholder='Введите номер договора'
              id='documentNumber'
              {...register('documentNumber', { required: 'Это поле обязательно' })}
              className={styles.input}
            />
            {errors.documentNumber && <span>{errors.documentNumber.message}</span>}
          </div>
        ) : (
          <div className={styles.inputWrapper} style={{ display: 'flex' }}>
            <label htmlFor='documentName'>Название договора:</label>
            <Input
              placeholder='Введите название договора'
              id='documentName'
              {...register('documentName', { required: 'Это поле обязательно' })}
              className={styles.input}
            />
            {errors.documentName && <span>{errors.documentName.message}</span>}
          </div>
        )}
        <div className={styles.readyBtnWrapper}>
          <Button className={styles.readyBtn} styleType={BUTTON_TYPES.GREEN} text='Готово' type='submit' />
        </div>
      </form>
    </Loading>
  );
};
