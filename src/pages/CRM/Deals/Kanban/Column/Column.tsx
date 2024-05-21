import React from 'react';
import cn from 'classnames';
import { Icon } from 'common/ui';
import { Card } from '../Card';
import { IColumn } from '../Kanban.helper';
import styles from './styles.module.scss';

import { useDrop } from 'react-dnd';

interface ColumnProps {
  col: IColumn;
  tasks: { id: number; text: string }[];
  onDrop: (id: number, newStatus: string) => void;
}

export const Column: React.FC<ColumnProps> = ({ col, tasks, onDrop }) => {
  const { status, title } = col;
  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    drop: (item: { id: number }) => onDrop(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  });

  return (
    <div className={cn(styles.column, { [styles.isOver]: isOver })} ref={drop}>
      <div className={styles.titleBlock}>
        <div className={cn(styles.roundIcon, styles[status])} />
        <span className={styles.title}>{title}</span>
        <span className={styles.count}>(1)</span>
        {status === 'received' && (
          <div className={styles.actionBlock}>
            <Icon type='delete' alt='delete' />
            <div className={styles.plus}>
              <Icon type='plus-icon' alt='plus' />
            </div>
          </div>
        )}
      </div>
      <div className={styles.createBtn} onClick={() => console.log('click plus')}>
        <Icon type='plus-icon' alt='plus' />
      </div>
      <div className={styles.cardsContainer}>
        {tasks.map((task) => (
          <Card key={task.id} id={task.id} text={task.text} />
        ))}
      </div>
    </div>
  );
};
