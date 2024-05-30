import { FC } from 'react';
import { Icon } from 'common/ui';
import { Item } from '../Accounts.helper';
import styles from './styles.module.scss';

interface IProps {
  item: Item;
}

export const AccountItem: FC<IProps> = ({ item }) => {
  const { part, fileName, dateTime } = item;

  return (
    <div className={styles.groupItem}>
      <div className={styles.head}>
        <span className={styles.part}>{part}</span>
        <Icon type='delete' className={styles.delete} />
      </div>
      <a className={styles.file}>{fileName}</a>
      <span className={styles.time}>{dateTime}</span>
    </div>
  );
};
