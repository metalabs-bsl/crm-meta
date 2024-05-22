import { FC } from 'react';
import cn from 'classnames';
import { Icon } from 'common/ui';
import styles from './style.module.scss';

import { DragSourceMonitor, useDrag } from 'react-dnd';

interface CardProps {
  id: number;
  text: string;
}

export const Card: FC<CardProps> = ({ id, text }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { type: 'CARD', id },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <div className={cn(styles.card, { [styles.isDragging]: isDragging })} ref={drag}>
      <div className={styles.titleBlock}>
        <div className={styles.main}>
          <span className={styles.title}>{text}</span>
          <span className={styles.client}>Азат</span>
        </div>
        <div className={styles.date}>8 мая</div>
      </div>
      <div className={styles.commentContainer}>
        <div className={styles.mainBlock}>
          <Icon type='comment' alt='comment' />
          <span className={styles.comment}>Прищельцы атакуют!</span>
        </div>
        <div className={styles.timeBlock}>
          <span className={styles.time}>11:11</span>
        </div>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.todoBlock}>
          <Icon type='plus-gray' alt='plus' className={styles.todoCreate} />
          <span className={styles.todo}>Дело</span>
          <span className={styles.count}>0</span>
        </div>
        <Icon type='userIcon' alt='user' className={styles.user} />
      </div>
    </div>
  );
};
