import { FC } from 'react';
import { Change } from 'types/entities';
import styles from './styles.module.scss';

interface IProps {
  data: Change;
}

export const Comment: FC<IProps> = ({ data }) => {
  return (
    <div className={styles.comment}>
      <div className={styles.headline}>
        <span className={styles.title}>Комментарий</span>
        <span className={styles.employee}>{data.employee}</span>
      </div>
      <div className={styles.middle}>
        <p className={styles.description}>{data.description}</p>
        <span className={styles.timestamp}>{data.timestamp}</span>
      </div>
    </div>
  );
};
