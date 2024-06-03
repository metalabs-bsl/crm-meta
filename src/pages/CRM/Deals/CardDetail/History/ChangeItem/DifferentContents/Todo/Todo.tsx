import { FC } from 'react';
import { Change } from 'pages/CRM/Deals/CardDetail/CardDetail.helper';
import styles from './styles.module.scss';

interface IProps {
  data: Change;
}

export const Todo: FC<IProps> = ({ data }) => {
  return (
    <div className={styles.todo}>
      <span className={styles.title}>Дело</span>
      <div className={styles.bottom}>
        <p className={styles.description}>{data.description}</p>
      </div>
      <div className={styles.dedline}>
        <span>Сделать до</span>
        <span className={styles.date}>9.05.2024, 11:11</span>
      </div>
    </div>
  );
};
