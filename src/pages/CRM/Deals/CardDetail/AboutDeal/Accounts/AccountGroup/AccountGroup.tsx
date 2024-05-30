import { FC } from 'react';
import { Date } from 'common/components';
import { AccountItem } from '../AccountItem';
import { AccountList } from '../Accounts.helper';
import styles from './style.module.scss';

interface IProps {
  group: AccountList;
}

export const AccountGroup: FC<IProps> = ({ group }) => {
  const { date, items } = group;
  return (
    <div className={styles.group}>
      <Date date={date} className={styles.group_date} />
      {items.map((item, index) => (
        <AccountItem key={index} item={item} />
      ))}
    </div>
  );
};
