import { FC, useState } from 'react';
import { Icon } from 'common/ui';
import { DeleteModal } from 'common/components';
import { dateFormatWithHour } from 'common/helpers';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useDeleteInvoiceMutation } from 'api/admin/leads/endpoints/invoice';
import { IInvoice } from 'types/entities';
import styles from './styles.module.scss';

interface IProps {
  item: IInvoice;
}

export const AccountItem: FC<IProps> = ({ item }) => {
  const { title, invoice_text, file_name, file_link, id, created_at } = item;
  const [deleteInvoice] = useDeleteInvoiceMutation();
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const formatedCreatedAt = dateFormatWithHour(created_at);
  const notify = useNotify();

  const onDelete = () => {
    deleteInvoice(id)
      .unwrap()
      .then(() => {
        setIsDeleteOpen(false);
        notify(MESSAGE.DELETED, 'success');
      });
  };

  return (
    <div className={styles.groupItem}>
      <div className={styles.head}>
        <span className={styles.part}>{title}</span>
        <Icon type='delete' className={styles.delete} onClick={() => setIsDeleteOpen(true)} />
      </div>
      <div className={styles.comment}>{invoice_text}</div>
      <a href={file_link} className={styles.file} target='_blank' rel='noreferrer'>
        {file_name}
      </a>
      <span className={styles.time}>{formatedCreatedAt}</span>
      {isDeleteOpen && (
        <DeleteModal
          text='Вы уверены что хотите удалить счёт?'
          isOpen={isDeleteOpen}
          onDelete={onDelete}
          onCancel={() => setIsDeleteOpen(false)}
        />
      )}
    </div>
  );
};
