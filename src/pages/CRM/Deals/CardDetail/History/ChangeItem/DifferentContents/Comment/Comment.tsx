import { FC } from 'react';
import { Change } from 'pages/CRM/Deals/CardDetail/CardDetail.helper';
import styles from './styles.module.scss';

interface IProps {
  data: Change;
}

export const Comment: FC<IProps> = ({ data }) => {
  return (
    <div className={styles.comment}>
      <span className={styles.title}>Комментарий</span>
      <div className={styles.middle}>
        <p className={styles.description}>{data.description}</p>
        <span className={styles.timestamp}>{data.timestamp}</span>
      </div>
    </div>
  );
};
