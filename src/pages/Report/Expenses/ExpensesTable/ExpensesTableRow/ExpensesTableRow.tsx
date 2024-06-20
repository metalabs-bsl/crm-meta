import { FC } from 'react';
import styles from './styles.module.scss';

interface ExpensesRowData {
  creationData: string;
  naming: string[];
  quantity: string[];
  price: number[];
}

interface IProps {
  data: ExpensesRowData[] | [];
}

export const ExpensesTableRow: FC<IProps> = ({ data }) => {
  return (
    <>
      {data?.map((el, index) => (
        <div className={styles.card} key={index}>
          <div className={`${styles.cardColumn} ${styles.cardData}`}>
            <p className={styles.cardText}>{el.creationData}</p>
          </div>
          <div className={`${styles.cardColumn} ${styles.cardNaming}`}>
            {el.naming.map((name, index) => (
              <p key={index} className={styles.cardText}>
                {name}
              </p>
            ))}
          </div>
          <div className={`${styles.cardColumn} ${styles.cardQuantity}`}>
            {el.quantity.map((qty, index) => (
              <p key={index} className={styles.cardText}>
                {qty}
              </p>
            ))}
          </div>
          <div className={`${styles.cardColumn} ${styles.cardPrice}`}>
            {el.price.map((price, index) => (
              <p key={index} className={styles.cardText}>
                {`${price} сом`}
              </p>
            ))}
            <p className={styles.cardTotal}>400 сом</p>
          </div>
        </div>
      ))}
    </>
  );
};
