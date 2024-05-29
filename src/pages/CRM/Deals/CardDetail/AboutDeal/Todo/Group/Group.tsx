import { FC } from 'react';
import { Date } from 'common/components';
import { GroupItem } from '../GroupItem';
import { ItemCardType, TodoList } from '../Todo.helper';
import styles from './style.module.scss';

interface IProps {
  group: TodoList;
  type: ItemCardType;
}

export const Group: FC<IProps> = ({ group, type }) => {
  const { date, items } = group;
  return (
    <div className={styles.group}>
      <Date date={date} className={styles.group_date} />
      {items.map((item, index) => (
        <GroupItem key={index} item={item} itemType={type} />
      ))}
    </div>
  );
};
