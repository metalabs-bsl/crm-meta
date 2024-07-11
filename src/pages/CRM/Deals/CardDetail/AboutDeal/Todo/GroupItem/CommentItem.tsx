import { FC, useState } from 'react';
import { Icon } from 'common/ui';
import { DeleteModal } from 'common/components';
import { dateFormatWithHour } from 'common/helpers';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useDeleteCommentMutation } from 'api/admin/leads/leads.api';
import { IComment } from 'types/entities';
import styles from './styles.module.scss';

interface IProps {
  item: IComment;
}

export const CommentItem: FC<IProps> = ({ item }) => {
  const notify = useNotify();
  const { comment_text, created_at, id } = item;
  const formatedCreatedAt = dateFormatWithHour(created_at);
  const [commentDelete] = useDeleteCommentMutation();
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  const onDelete = () => {
    commentDelete(id)
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
            {comment_text}
            <span className={styles.dateTime}>{formatedCreatedAt}</span>
          </div>
        </div>
        <Icon type='delete' className={styles.delete} onClick={() => setIsDeleteOpen(true)} />
        {isDeleteOpen && (
          <DeleteModal
            isOpen={isDeleteOpen}
            text={`Вы уверены что хотите удалить комментарий "${comment_text}"`}
            onDelete={onDelete}
            onCancel={() => setIsDeleteOpen(false)}
          />
        )}
      </div>
    </div>
  );
};
