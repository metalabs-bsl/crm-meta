import { ChangeEvent, FC, useState } from 'react';
import { SearchInput, Select } from 'common/ui';
import { useAppSelector } from 'common/hooks';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import { Options } from 'types/common';
import { ROLES } from 'types/roles';
import { General } from './General';
import { Personal } from './Personal';
import styles from './styles.module.scss';

const selectOptions: Options[] = [
  {
    label: 'Мои сделки',
    value: 'my'
  },
  {
    label: 'Общие сделки',
    value: 'all'
  }
];

export const Start: FC = () => {
  const { role } = useAppSelector(employeesSelectors.employees);
  const [content, setContent] = useState<Options['value']>('my');
  const isSeleсtAccess = role === ROLES.DIRECTOR || role === ROLES.SENIOR_MANAGER;

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setContent(e.target.value as Options['value']);
  };

  return (
    <div className={styles.start}>
      <div className={styles.headBlock}>
        <div className={styles.titleBlock}>
          <h1>Старт</h1>
        </div>
        <div className={styles.inputsWrapper}>
          {isSeleсtAccess && <Select options={selectOptions} className={styles.select} value={content} onChange={handleSelect} />}
          <SearchInput placeholder='Поиск' />
        </div>
      </div>
      <div className={styles.bodyBlock}>
        {content === 'my' && <Personal />}
        {content === 'all' && <General />}
      </div>
    </div>
  );
};
