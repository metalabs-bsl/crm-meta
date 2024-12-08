import { FC } from 'react';
import { ITableData } from '../../types/ITableData';
import styles from './styles.module.scss';

export const ExpensesTableRow: FC<ITableData> = ({ creationDate, list, total }) => {
  return (
    <div className={styles.card}>
      <div className={`${styles.cardColumn} ${styles.cardData}`}>
        <p className={styles.cardText}>{creationDate.split('T')[0]}</p>
      </div>
      <div className={`${styles.cardColumn} ${styles.cardNaming}`}>
        {list.map((el, idx) => (
          <p key={idx} className={styles.cardText}>
            {el.name}
          </p>
        ))}
      </div>
      <div className={`${styles.cardColumn} ${styles.cardQuantity}`}>
        {list.map((el, idx) => (
          <p key={idx} className={styles.cardText}>
            {el.quantity}
          </p>
        ))}
      </div>
      <div className={`${styles.cardColumn} ${styles.cardPrice}`}>
        {list.map((el, idx) => (
          <p key={idx} className={styles.cardText}>
            {`${el.price} сом`}
          </p>
        ))}
        <p className={styles.cardTotal}>{total}</p>
      </div>
    </div>
  );
};
