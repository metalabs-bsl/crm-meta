import { useState } from 'react';
import { Options } from 'types/pages';
import { Button, FilePicker, Select } from 'common/ui';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export const CreateFileForm = () => {
  const [options] = useState<Options[]>([
    {
      label: 'Первая часть',
      value: 'first'
    },
    {
      label: 'Вторая часть',
      value: 'second'
    },
    {
      label: 'Третья часть',
      value: 'third'
    },
    {
      label: 'Четвертая часть',
      value: 'fourth'
    },
    {
      label: 'Пятая часть',
      value: 'fifth'
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
