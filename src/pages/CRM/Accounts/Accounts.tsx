import { SearchInput } from 'common/ui';
import { Table } from './Table';
import styles from './styles.module.scss';

export const Accounts = () => {
  return (
    <div className={styles.accounts}>
      <div className={styles.headBlock}>
        <div className={styles.titleBlock}>
          <h1>Счета</h1>
        </div>
        <SearchInput placeholder='Поиск' />
      </div>
      <div className={styles.bodyBlock}>
        <Table />
      </div>
    </div>
  );
};
