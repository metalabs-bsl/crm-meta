import { FC, ReactNode } from 'react';
import styles from './styles.module.scss';

interface IProps {
  children?: ReactNode;
  count?: number;
}

export const Badge: FC<IProps> = ({ children, count = 0 }) => {
  return (
    <div className={styles.badge}>
      {children}
      {count > 0 && <span className={styles.count}>{count}</span>}
    </div>
  );
};
