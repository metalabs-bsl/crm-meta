import { FC, ReactNode } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

interface IProps {
  children?: ReactNode;
  count?: number;
}

export const Badge: FC<IProps> = ({ children, count = 0 }) => {
  return (
    <div className={styles.badge}>
      {children}
      <span className={cn(styles.count, { [styles.moreCount]: !!count })}>{count}</span>
    </div>
  );
};
