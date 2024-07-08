import { FC, useState } from 'react';
import { Button, Icon } from 'common/ui';
import { DeleteModal } from 'common/components';
import { dateFormatWithHour } from 'common/helpers';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useDeleteReminderMutation } from 'api/admin/leads/leads.api';
import { ICreateReminderParams } from 'types/entities';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

interface IProps {
  item: ICreateReminderParams;
}

export const TodoItem: FC<IProps> = ({ item }) => {
  const notify = useNotify();
  const { date_to_finish, reminder_text, created_at, id } = item;
  const formatedCreatedAt = dateFormatWithHour(created_at);
  const formatedDateToFinish = dateFormatWithHour(date_to_finish);
  const [reminderDelete] = useDeleteReminderMutation();
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  const onDelete = () => {
    reminderDelete(id)
      .unwrap()
      .then(() => {
        notify(MESSAGE.DELETED);
        setIsDeleteOpen(false);
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
          <Button styleType={BUTTON_TYPES.YELLOW} text='выполнено' className={styles.done_btn} />
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
      </div>
    </div>
  );
};
