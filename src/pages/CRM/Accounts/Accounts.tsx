import { SearchInput, Select } from 'common/ui';
import { useAppSelector } from 'common/hooks';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import { Options } from 'types/common';
import { ROLES } from 'types/roles';
import { Table } from './Table';
import styles from './styles.module.scss';

const options: Options[] = [
  { label: 'Мои счета', value: '1' },
  { label: 'Общие счета', value: '2' }
];

export const Accounts = () => {
  const { role } = useAppSelector(employeesSelectors.employees);
  const isManagement = role === ROLES.DIRECTOR || role === ROLES.SENIOR_MANAGER;
  return (
    <div className={styles.accounts}>
      <div className={styles.headBlock}>
        <div className={styles.titleBlock}>
          <h1>Счета</h1>
        </div>
        <div className={styles.filterBlock}>
          {isManagement && <Select defaultValue={options[0].value} options={options} className={styles.filterSelect} />}
          <SearchInput placeholder='Поиск' />
        </div>
      </div>
      <div className={styles.bodyBlock}>
        <Table />
      </div>
    </div>
  );
};
