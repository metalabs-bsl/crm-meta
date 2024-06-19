import { FC, useRef, useState } from 'react';
import cn from 'classnames';
import { Icon } from 'common/ui';
import { ClientWindow, DropdownModal, EdgeModal, Modal } from 'common/components';
import { dateFormat } from 'common/helpers';
import { CardDetail } from '../../CardDetail';
import { Task } from '../../Deals.helper';
import { TodoCreateForm } from './TodoCreateForm';
import styles from './style.module.scss';

import { DragSourceMonitor, useDrag } from 'react-dnd';
import { BUTTON_TYPES } from 'types/enums';

interface CardProps {
  data: Task;
  index: number;
}

export const Card: FC<CardProps> = ({ data, index }) => {
  const { brutto, comment, date, status, text, todoCount, user, id } = data;
  const [open, setOpen] = useState<boolean>(false);
  const [openTodoModal, setOpenTodoModal] = useState<boolean>(false);
  const [clientOpen, setClientOpen] = useState<boolean>(false);
  const updatedDate = dateFormat(date);
  const profileRef = useRef(null);

  const onClose = () => {
    setOpen(false);
  };

  const onCloseTodoModal = () => {
    setOpenTodoModal(false);
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { type: 'CARD', id, index, status },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <div className={cn(styles.card, { [styles.isDragging]: isDragging })} ref={drag} id={`card-${status}-${index}`}>
      <div className={styles.titleBlock} onClick={() => setOpen(true)}>
        <div className={styles.main}>
          <span className={styles.title}>{text}</span>
          <span
            className={styles.client}
            onMouseEnter={() => setClientOpen(true)}
            onMouseLeave={() => setClientOpen(false)}
            ref={profileRef}
          >
            {user.name}
          </span>
          <div className={styles.brutto}>
            <span>Брутто:</span> {brutto}
          </div>
        </div>
        <div className={styles.date}>{updatedDate}</div>
      </div>
      <div className={styles.commentContainer}>
        <div className={styles.mainBlock}>
          <Icon type='comment' alt='comment' />
          <span className={styles.comment}>{comment}</span>
        </div>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.todoBlock}>
          <Icon type='plus-gray' alt='plus' className={styles.todoCreate} onClick={() => setOpenTodoModal(true)} />
          <span className={styles.todo}>Дело</span>
          <span className={styles.count}>{todoCount}</span>
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
      <DropdownModal targetRef={profileRef} isOpen={clientOpen} onClose={() => setClientOpen(false)}>
        <ClientWindow data={user} />
      </DropdownModal>
    </div>
  );
};
