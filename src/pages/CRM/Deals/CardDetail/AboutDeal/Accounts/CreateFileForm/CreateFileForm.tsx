import { useState } from 'react';
import { Button, FilePicker, Select } from 'common/ui';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export const CreateFileForm = () => {
  const [options] = useState([
    {
      title: 'Первая часть',
      value: 'first'
    }
  ]);

  return (
    <form className={styles.form}>
      <Select options={options} />
      <FilePicker />
      <Button styleType={BUTTON_TYPES.YELLOW} text='отправить' />
    </form>
  );
};
