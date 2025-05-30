import { FC, MouseEvent, useRef, useState } from 'react';
import cn from 'classnames';
import { Icon } from 'common/ui';
import { ClientWindow, DeleteModal, DropdownModal, Modal, ResponsibleWindow } from 'common/components';
import { dateFormat } from 'common/helpers';
import { useAppDispatch, useNotify, useRedirect } from 'common/hooks';
import { crmChapters } from 'common/constants';
import { useDeleteLeadMutation } from 'api/admin/leads/endpoints/lead';
import { setChangeOpenEdgeModal, setIdUser } from 'api/admin/sidebar/sidebar.slice';
import { Task } from 'types/entities';
import { TodoCreateForm } from './TodoCreateForm';
import styles from './style.module.scss';

import { DragSourceMonitor, useDrag } from 'react-dnd';

interface CardProps {
  data: Task;
  index: number;
  canDrag: boolean;
}

export const Card: FC<CardProps> = ({ data, index, canDrag }) => {
  const dispatch = useAppDispatch();
  const { comment_or_reminder, lead_name, count_of_reminders, id, customer, brutto, responsible_employee, created_at } = data;
  const [openTodoModal, setOpenTodoModal] = useState<boolean>(false);
  const [clientOpen, setClientOpen] = useState<boolean>(false);
  const [responsibleOpen, setResponsibleOpen] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const redirect = useRedirect();
  const updatedDate = dateFormat(created_at);
  const profileRef = useRef(null);
  const responsibleRef = useRef(null);

  const [deleteLead] = useDeleteLeadMutation();

  const notify = useNotify();

  const onOpen = () => {
    redirect.crm({ chapter: crmChapters.transactions.chapter, search: id });
    dispatch(setChangeOpenEdgeModal(true));
    dispatch(setIdUser(id));
  };

  const onCloseTodoModal = () => {
    setOpenTodoModal(false);
  };

  const openDeleteModal = (e: MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    deleteLead(id)
      .unwrap()
      .then(() => {
        notify('Lead deleted successfully', 'success');
      })
      .catch(() => {
        notify('Error deleting lead', 'error');
      })
      .finally(() => {
        setShowDeleteModal(false);
      });
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    canDrag,
    item: { type: 'CARD', id, index },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <>
      <div className={cn(styles.card, { [styles.isDragging]: isDragging })} ref={drag} id={`card-${index}`}>
        <div className={styles.titleBlock} onClick={onOpen}>
          <div className={styles.deleteIconContainer}>
            <Icon type='delete' onClick={(e) => openDeleteModal(e)} />
          </div>
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
          <div
            className={cn(styles.commentContainer, {
              [styles.highlight]: comment_or_reminder.text === 'Повторный лид'
            })}
          >
            <div className={styles.mainBlock}>
              <Icon type={comment_or_reminder.type === 'reminder' ? 'history-todo' : 'comment'} alt='comment' />
              <span className={styles.comment}>{comment_or_reminder.text}</span>
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
            {responsible_employee?.avatar_id ? (
              <img
                className={styles.user_img}
                src={`${process.env.REACT_APP_BASE_URL}/files/download/${responsible_employee?.avatar_id}`}
                alt='user'
              />
            ) : responsible_employee?.first_name || responsible_employee?.second_name ? (
              <div className={styles.user_initial}>
                {`${responsible_employee?.first_name?.charAt(0).toUpperCase() || ''}${
                  responsible_employee?.second_name?.charAt(0).toUpperCase() || ''
                }`}
              </div>
            ) : (
              <Icon type='userIcon' alt='user' className={styles.user_img} />
            )}
          </span>
        </div>
        {openTodoModal && (
          <Modal isOpen={openTodoModal} onClose={onCloseTodoModal}>
            <TodoCreateForm lead_id={id} onCancel={onCloseTodoModal} />
          </Modal>
        )}
        {responsibleOpen && (
          <DropdownModal targetRef={responsibleRef} isOpen={responsibleOpen} onClose={() => setResponsibleOpen(false)}>
            <ResponsibleWindow data={{ firstName: responsible_employee?.first_name, lastName: responsible_employee?.second_name }} />
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
      <DeleteModal
        text={`Вы уверены, что хотите удалить ${lead_name}?`}
        isOpen={showDeleteModal}
        onDelete={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};
