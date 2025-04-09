import { FC, useState } from 'react';
import { Button } from 'common/ui';
import { DeleteModal } from 'common/components';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

interface IProps {
  onDelete: () => void;
  onDownload: () => void;
}

export const DownloadDelete: FC<IProps> = ({ onDelete, onDownload }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  const onCloseDeleteModal = () => {
    setIsDeleteOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    onCloseDeleteModal();
  };

  return (
    <div className={styles.DownloadDelete}>
      <Button className={styles.btn} styleType={BUTTON_TYPES.GREEN} text='Скачать' onClick={onDownload} />
      <Button className={styles.btn} styleType={BUTTON_TYPES.GRAY} text='Удалить' onClick={() => setIsDeleteOpen(true)} />
      <DeleteModal
        text='Вы действительно хотите удалить этот документ?'
        isOpen={isDeleteOpen}
        onDelete={handleDelete}
        onCancel={onCloseDeleteModal}
      />
    </div>
  );
};
