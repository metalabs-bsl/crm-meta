import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loading, SearchInput, Select } from 'common/ui';
import { useAppSelector } from 'common/hooks';
import { useGetAllAccountsQuery } from 'api/admin/accounts/accounts.api';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import { Options } from 'types/common';
import { ROLES } from 'types/roles';
import { Table } from './Table';
import styles from './styles.module.scss';

const options: Options[] = [
  { label: 'Мои счета', value: 'false' },
  { label: 'Общие счета', value: 'true' }
];

export const Accounts = () => {
  const navigate = useNavigate();
  const { role } = useAppSelector(employeesSelectors.employees);
  const isManagement = role === ROLES.DIRECTOR || role === ROLES.SENIOR_MANAGER;

  const params = new URLSearchParams(useLocation().search);
  const isFullParam = params.get('isFull') ?? 'false';
  const [isFull, setIsFull] = useState<string>(isFullParam);

  const { data, isFetching } = useGetAllAccountsQuery(isFull);

  const onFilterChange = (value: string) => {
    setIsFull(value);
    navigate({ search: `?isFull=${value}` }, { replace: true });
  };

  return (
    <div className={styles.accounts}>
      <div className={styles.headBlock}>
        <h1>Счета</h1>
        <div className={styles.filterBlock}>
          {isManagement && (
            <Select value={isFull} options={options} className={styles.filterSelect} onChange={(e) => onFilterChange(e.target.value)} />
          )}
          <SearchInput placeholder='Поиск' />
        </div>
      </div>
      <div className={styles.bodyBlock}>
        <Loading isSpin={isFetching}>
          <Table data={data || []} />
        </Loading>
      </div>
    </div>
  );
};
