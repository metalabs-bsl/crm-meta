import { FC } from 'react';
import { Button, Icon } from 'common/ui';
import { ItemCardType, TodoItem } from '../Todo.helper';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

interface IProps {
  item: TodoItem;
  itemType: ItemCardType;
}

export const GroupItem: FC<IProps> = ({ item, itemType }) => {
  const { dedline, text, dateTime } = item;
  return (
    <div className={styles.groupItem}>
      <div className={styles.content}>
        <div className={styles.text}>
          {text}
          <span className={styles.dateTime}>{dateTime}</span>
        </div>
        {itemType === 'todos' && (
          <>
            <div className={styles.dedline}>
              <span>Сделать до:</span>
              <span className={styles.date}>{dedline}</span>
            </div>
            <Button styleType={BUTTON_TYPES.YELLOW} text='выполнено' className={styles.done_btn} />
          </>
        )}
      </div>
      <Icon type='delete' className={styles.delete} />
    </div>
  );
};
