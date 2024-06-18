import { ChangeEvent, useState } from 'react';
import { Input, Select } from 'common/ui';
import { IOption } from 'common/ui/Select/Select';
import { General } from './General';
import { Personal } from './Personal';
import styles from './styles.module.scss';

const selectOptions: IOption[] = [
  {
    title: 'Мои',
    value: 'personal'
  },
  {
    title: 'Общие',
    value: 'general'
  }
];

export const Start = () => {
  const [content, setContent] = useState<IOption['value']>('personal');

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setContent(e.target.value as IOption['value']);
  };

  return (
    <div className={styles.start}>
      <div className={styles.headBlock}>
        <div className={styles.titleBlock}>
          <h1>Старт</h1>
        </div>
        <div className={styles.inputsWrapper}>
          <Select options={selectOptions} className={styles.select} value={content} onChange={handleSelect} />
          <Input placeholder='Поиск' isSearch />
        </div>
      </div>
      <div className={styles.bodyBlock}>
        {content === 'personal' && <Personal />}
        {content === 'general' && <General />}
      </div>
    </div>
  );
};
