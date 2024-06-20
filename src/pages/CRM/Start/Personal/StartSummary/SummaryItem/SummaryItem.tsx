import { FC } from 'react';
import styles from './styles.module.scss';

interface SummaryItemProps {
  icon: string;
  title: string;
  value: string;
}

export const SummaryItem: FC<SummaryItemProps> = ({ icon, title, value }) => {
  return (
    <div className={styles.item}>
      <div className={styles.icon}>
        <img src={icon} alt='icon' />
      </div>
      <div className={styles.info}>
        <h4 className={styles.title}>{title}</h4>
        <h3 className={styles.value}>{value}</h3>
      </div>
    </div>
  );
};
