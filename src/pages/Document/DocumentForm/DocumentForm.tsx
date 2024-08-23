import { FC, useState } from 'react';
import { Button, FilePicker, Input } from 'common/ui';
import styles from './styles.module.scss';

import { SubmitHandler, useForm } from 'react-hook-form';
import { BUTTON_TYPES } from 'types/enums';

interface DocumentFormProps {
  onClose: () => void;
  activeTab: string;
}

interface FormValues {
  documentNumber?: string;
}

export const DocumentForm: FC<DocumentFormProps> = ({ onClose, activeTab }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>();
  const [file, setFile] = useState<File>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const updatedData = { ...data, file };

    if (activeTab === 'tab2') {
      delete updatedData.documentNumber;
    }
    console.log(updatedData);
    reset();
    onClose();
  };

  return (
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
      {activeTab === 'tab1' && (
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
      )}
      <div className={styles.readyBtnWrapper}>
        <Button className={styles.readyBtn} styleType={BUTTON_TYPES.GREEN} text='Готово' type='submit' />
      </div>
    </form>
  );
};
