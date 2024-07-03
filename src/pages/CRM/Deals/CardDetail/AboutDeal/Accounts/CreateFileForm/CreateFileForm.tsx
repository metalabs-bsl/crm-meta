import { useState } from 'react';
import { Options } from 'types/pages';
import { Button, FilePicker, Select } from 'common/ui';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export const CreateFileForm = () => {
  const [files, setFiles] = useState<File[]>([]); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [options] = useState<Options[]>([
    {
      label: 'Первая оплата',
      value: 'first'
    },
    {
      label: 'Вторая оплата',
      value: 'second'
    },
    {
      label: 'Третья оплата',
      value: 'third'
    },
    {
      label: 'Четвертая оплата',
      value: 'fourth'
    },
    {
      label: 'Пятая оплата',
      value: 'fifth'
    }
  ]);

  return (
    <form className={styles.form}>
      <Select options={options} />
      <textarea name='' id='' placeholder='Напишите что нужно сделать'></textarea>
      <FilePicker onFilesSelect={setFiles} />
      <Button styleType={BUTTON_TYPES.YELLOW} text='отправить' />
    </form>
  );
};
