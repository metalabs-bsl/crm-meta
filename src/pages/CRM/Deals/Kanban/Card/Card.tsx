import { FC, useState } from 'react';
import cn from 'classnames';
import { Icon } from 'common/ui';
import { EdgeModal, Modal } from 'common/components';
import { CardDetail } from '../../CardDetail';
import { TodoCreateForm } from './TodoCreateForm';
import styles from './style.module.scss';

import { DragSourceMonitor, useDrag } from 'react-dnd';
import { BUTTON_TYPES } from 'types/enums';

interface CardProps {
  id: number;
  text: string;
}

export const Card: FC<CardProps> = ({ id, text }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openTodoModal, setOpenTodoModal] = useState<boolean>(false);

  const onClose = () => {
    setOpen(false);
  };

  const onCloseTodoModal = () => {
    setOpenTodoModal(false);
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { type: 'CARD', id },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <div className={cn(styles.card, { [styles.isDragging]: isDragging })} ref={drag}>
      <div className={styles.titleBlock} onClick={() => setOpen(true)}>
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
          <Icon type='plus-gray' alt='plus' className={styles.todoCreate} onClick={() => setOpenTodoModal(true)} />
          <span className={styles.todo}>Дело</span>
          <span className={styles.count}>0</span>
        </div>
        <Icon type='userIcon' alt='user' className={styles.user} />
      </div>
      <EdgeModal isOpen={open} onClose={onClose}>
        <CardDetail cardTitle={text} />
      </EdgeModal>
      <Modal
        isOpen={openTodoModal}
        onClose={onCloseTodoModal}
        leftBtnText='сохранить'
        leftBtnStyle={BUTTON_TYPES.YELLOW}
        rightBtnText='отменить'
        rightBtnStyle={BUTTON_TYPES.Link_BLACK}
        rightBtnAction={onCloseTodoModal}
      >
        <TodoCreateForm />
      </Modal>
    </div>
  );
};
