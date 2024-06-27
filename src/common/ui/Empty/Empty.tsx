import { FC } from 'react';
import emptyImg from '../../assets/images/empty.png';
import styles from './styles.module.scss';

interface EmptyProps {
  text?: string;
}

export const Empty: FC<EmptyProps> = ({ text }) => {
  return (
    <div className={styles.empty}>
      <div className={styles.imgWrapper}>
        <img src={emptyImg} alt='пусто' />
      </div>
      <p className={styles.emptyText}>{text || 'Нет данных'}</p>
    </div>
  );
};
