import { FC, useRef, useState } from 'react';
import cn from 'classnames';
import { Icon } from 'common/ui';
import { ClientWindow, DropdownModal, EdgeModal, Modal, ResponsibleWindow } from 'common/components';
import { dateFormat } from 'common/helpers';
import { useAppDispatch } from 'common/hooks';
import { setChangeOpenEdgeModal } from 'api/admin/sidebar/sidebar.slice';
import { Task } from 'types/entities';
import { CardDetail } from '../../CardDetail';
import { TodoCreateForm } from './TodoCreateForm';
import styles from './style.module.scss';

import { DragSourceMonitor, useDrag } from 'react-dnd';

interface CardProps {
  data: Task;
  index: number;
}

export const Card: FC<CardProps> = ({ data, index }) => {
  const dispatch = useAppDispatch();
  const { brutto, comment_or_reminder, lead_name, count_of_reminders, id, customer } = data;
  const [openTodoModal, setOpenTodoModal] = useState<boolean>(false);
  const [clientOpen, setClientOpen] = useState<boolean>(false);
  const [responsibleOpen, setResponsibleOpen] = useState<boolean>(false);

  const updatedDate = dateFormat(customer.created_at);
  const profileRef = useRef(null);
  const responsibleRef = useRef(null);

  const onOpen = () => {
    dispatch(setChangeOpenEdgeModal(true));
  };

  const onCloseTodoModal = () => {
    setOpenTodoModal(false);
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { type: 'CARD', id, index },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <div className={cn(styles.card, { [styles.isDragging]: isDragging })} ref={drag} id={`card-${index}`}>
      <div className={styles.titleBlock} onClick={onOpen}>
        <div className={styles.main}>
          <span className={styles.title}>{lead_name}</span>
          <span
            className={styles.client}
            onMouseEnter={() => setClientOpen(true)}
            onMouseLeave={() => setClientOpen(false)}
            ref={profileRef}
          >
            {customer.fullname}
          </span>
          {brutto && (
            <div className={styles.brutto}>
              <span>Брутто:</span> {brutto}
            </div>
          )}
        </div>
        <div className={styles.date}>{updatedDate}</div>
      </div>
      {comment_or_reminder && (
        <div className={styles.commentContainer}>
          <div className={styles.mainBlock}>
            <Icon type='comment' alt='comment' />
            <span className={styles.comment}>{comment_or_reminder}</span>
          </div>
        </div>
      )}
      <div className={styles.cardFooter}>
        <div className={styles.todoBlock}>
          <Icon type='plus-gray' alt='plus' className={styles.todoCreate} onClick={() => setOpenTodoModal(true)} />
          <span className={styles.todo}>Дело</span>
          <span className={styles.count}>{count_of_reminders}</span>
        </div>
        <span onMouseEnter={() => setResponsibleOpen(true)} onMouseLeave={() => setResponsibleOpen(false)} ref={responsibleRef}>
          <Icon type='userIcon' alt='user' className={styles.user} />
        </span>
      </div>
      <EdgeModal>
        <CardDetail cardTitle={lead_name} />
      </EdgeModal>
      {openTodoModal && (
        <Modal isOpen={openTodoModal} onClose={onCloseTodoModal}>
          <TodoCreateForm lead_id={id} onCancel={onCloseTodoModal} />
        </Modal>
      )}
      {responsibleOpen && (
        <DropdownModal targetRef={responsibleRef} isOpen={responsibleOpen} onClose={() => setResponsibleOpen(false)}>
          <ResponsibleWindow data={{ firstName: 'Aзатов', lastName: 'Азат' }} />
        </DropdownModal>
      )}
      {clientOpen && (
        <DropdownModal targetRef={profileRef} isOpen={clientOpen} onClose={() => setClientOpen(false)}>
          <ClientWindow
            data={{
              birthday: customer.date_of_birth,
              city: customer.city,
              name: customer.fullname,
              phone: customer.phone,
              source: customer.source
            }}
          />
        </DropdownModal>
      )}
    </div>
  );
};
