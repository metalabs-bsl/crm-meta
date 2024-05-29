import { useState } from 'react';
import { Button, DatePicker, Select } from 'common/ui';
import styles from './style.module.scss';

import { BUTTON_TYPES } from 'types/enums';

const selectOptions = [
  {
    value: 'todo',
    title: 'Дело'
  },
  {
    value: 'comment',
    title: 'Комментарий'
  }
];

export const CreateForm = () => {
  const [isTodo, setIsTodo] = useState<boolean>(true);

  return (
    <form className={styles.form}>
      <Select
        options={selectOptions}
        defaultValue={selectOptions[0].value}
        onChange={(e) => setIsTodo(e.target.value === selectOptions[0].value)}
      />
      <div className={styles.textareaBlock}>
        <textarea name='' id='' placeholder='Напишите что нужно сделать'></textarea>
        {isTodo && <DatePicker className={styles.datePicker} defaultValue='2024-05-08T11:11' />}
      </div>
      <div className={styles.btnsBlock}>
        <Button styleType={BUTTON_TYPES.YELLOW} text='cохранить' />
        <Button styleType={BUTTON_TYPES.Link_BLACK} text='отменить' />
      </div>
    </form>
  );
};
