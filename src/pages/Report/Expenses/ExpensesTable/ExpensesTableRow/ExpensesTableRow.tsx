import { FC } from 'react';
import { Icon } from 'common/ui';
import { ITableData } from '../../types/ITableData';
import styles from './styles.module.scss';

interface ExpensesTableRowProps {
  expense: ITableData;
  deleteExpense: (id: string) => void;
}

export const ExpensesTableRow: FC<ExpensesTableRowProps> = ({ expense, deleteExpense }) => {
  const { creationDate, list, total } = expense;

  return (
    <div className={styles.card}>
      <div className={`${styles.cardColumn} ${styles.cardData}`}>
        <p className={styles.cardText}>{creationDate.split('T')[0]}</p>
      </div>
      <div className={`${styles.cardColumn} ${styles.cardNaming}`}>
        {list.map((item) => (
          <p key={item.id} className={styles.cardText}>
            {item.name}
          </p>
        ))}
      </div>
      <div className={`${styles.cardColumn} ${styles.cardQuantity}`}>
        {list.map((item) => (
          <p key={item.id} className={styles.cardText}>
            {item.quantity}
          </p>
        ))}
      </div>
      <div className={`${styles.cardColumn} ${styles.cardPrice}`}>
        {list.map((item) => (
          <div key={item.id} className={styles.cardRow}>
            <p className={styles.cardText}>{`${item.price} сом`}</p>
          </div>
        ))}
        <p className={styles.cardTotal}>Итого: {total} сом</p>
      </div>
      <div className={`${styles.cardColumn} ${styles.cardDelete}`}>
        {list.map((item) => (
          <div key={item.id} className={styles.cardRow}>
            <Icon type='delete' className={styles.cardDeleteRow} onClick={() => deleteExpense(item.id)} />
          </div>
        ))}
      </div>
    </div>
  );
};
