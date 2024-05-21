import { FC } from 'react';
import { Icon } from '../Icon';
import styles from './style.module.scss';

interface IProps {
  placeholder?: string;
}

export const Input: FC<IProps> = ({ placeholder }) => {
  return (
    <div className={styles.inputContainer}>
      <input type='text' className={styles.input} placeholder={placeholder} />
      <Icon type='search' alt='search' className={styles.searchIcon} />
    </div>
  );
};
