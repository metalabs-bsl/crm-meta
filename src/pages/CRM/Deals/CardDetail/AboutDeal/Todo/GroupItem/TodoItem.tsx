import { FC, useState } from 'react';
import { Button, Icon, Loading } from 'common/ui';
import { DeleteModal, Modal } from 'common/components';
import { dateFormatWithHour } from 'common/helpers';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useDeleteReminderMutation, useDoneReminderMutation } from 'api/admin/leads/leads.api';
import { ICreateReminderParams } from 'types/entities';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

interface IProps {
  item: ICreateReminderParams;
}

export const TodoItem: FC<IProps> = ({ item }) => {
  const notify = useNotify();
  const { date_to_finish, reminder_text, created_at, id, status } = item;
  const formatedCreatedAt = dateFormatWithHour(created_at);
  const formatedDateToFinish = dateFormatWithHour(date_to_finish);
  const [reminderDelete] = useDeleteReminderMutation();
  const [doneReminder, { isLoading }] = useDoneReminderMutation();
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isDoneOpen, setIsDoneOpen] = useState<boolean>(false);

  const onDelete = () => {
    reminderDelete(id)
      .unwrap()
      .then(() => {
        notify(MESSAGE.DELETED, 'success');
        setIsDeleteOpen(false);
      });
  };

  const onDone = () => {
    doneReminder(id)
      .unwrap()
      .then(() => {
        notify(MESSAGE.UPDATED, 'success');
        setIsDoneOpen(false);
      })
      .catch(() => {
        notify(MESSAGE.ERROR, 'error');
      });
  };

  return (
    <div className={styles.group}>
      <div className={styles.groupItem}>
        <div className={styles.content}>
          <div className={styles.text}>
            {reminder_text}
            <span className={styles.dateTime}>{formatedCreatedAt}</span>
          </div>
          <div className={styles.dedline}>
            <span>Сделать до:</span>
            <span className={styles.date}>{formatedDateToFinish}</span>
          </div>
          {status === 1 ? (
            <Button styleType={BUTTON_TYPES.YELLOW} text='выполнено' className={styles.done_btn} onClick={() => setIsDoneOpen(true)} />
          ) : (
            <span className={styles.alreadyFinished}>уже выполнено</span>
          )}
        </div>
        <Icon type='delete' className={styles.delete} onClick={() => setIsDeleteOpen(true)} />
        {isDeleteOpen && (
          <DeleteModal
            isOpen={isDeleteOpen}
            text={`Вы уверены что хотите удалить дело "${reminder_text}"`}
            onDelete={onDelete}
            onCancel={() => setIsDeleteOpen(false)}
          />
        )}
        {isDoneOpen && (
          <Modal
            isOpen={isDoneOpen}
            leftBtnText='Подтверждаю'
            leftBtnStyle={BUTTON_TYPES.YELLOW}
            leftBtnAction={onDone}
            rightBtnText='отменить'
            rightBtnStyle={BUTTON_TYPES.LINK_GRAY}
            rightBtnAction={() => setIsDoneOpen(false)}
            onClose={() => setIsDoneOpen(false)}
          >
            <Loading isSpin={isLoading}>
              <p className={styles.doneModalText}>
                Вы уверены что хотите отметить дело
                <br />
                <span className={styles.reminder_title}>{reminder_text}</span>
                <br />
                как выполненное?
              </p>
            </Loading>
          </Modal>
        )}
      </div>
    </div>
  );
};
