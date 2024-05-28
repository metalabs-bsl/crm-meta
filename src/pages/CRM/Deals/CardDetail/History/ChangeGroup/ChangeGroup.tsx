import { FC } from 'react';
import { Change } from '../../CardDetail.helper';
import { ChangeItem } from '../ChangeItem';
import { Date } from '../Date';
import styles from '../styles.module.scss';

interface ChangeGroupProps {
  date: string;
  changes: Change[];
  isFirst: boolean;
}

export const ChangeGroup: FC<ChangeGroupProps> = ({ date, changes, isFirst }) => {
  return (
    <div className={styles.change_group}>
      <Date date={date} />
      {changes.map((change, index) => (
        <ChangeItem key={index} changes={change} isFirstItem={index === 0} isFirstGroup={isFirst} />
      ))}
    </div>
  );
};
