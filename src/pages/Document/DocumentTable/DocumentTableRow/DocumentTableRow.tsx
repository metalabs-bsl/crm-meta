import { FC, useState } from 'react';
import { Icon } from 'common/ui';
import { DeleteModal } from 'common/components';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import test from '../assets/test.png';
import styles from '../Document.module.scss';

interface IFile {
  title: string;
  file: string;
}

interface IProps {
  data: IFile;
}

export const DocumentTableRow: FC<IProps> = ({ data }) => {
  const notification = useNotify();
  const [delOpen, setDelOpen] = useState<boolean>(false);
  const { title, file } = data;

  const cancelDelete = () => {
    setDelOpen(false);
  };

  const deleteDocument = () => {
    notification(MESSAGE.DELETED);
    setDelOpen(false);
  };

  return (
    <div className={styles.bodyTr}>
      <div className={`${styles.bodyTd} ${styles.naming}`}>{title}</div>
      <a className={`${styles.bodyTd} ${styles.format}`} target='_blank' rel='noreferrer' href={test}>
        {file}
      </a>
      <div className={`${styles.bodyTd} ${styles.action}`}>
        <div className={styles.iconsWrapper}>
          <a href='#' className={styles.downloadIcon} download={test}>
            <Icon type='download' />
          </a>
          <span className={styles.deleteIcon}>
            <Icon type='delete' onClick={() => setDelOpen(true)} />
          </span>
        </div>
      </div>
      <DeleteModal text={`Вы точно хотите удалить "${title}"`} isOpen={delOpen} onCancel={cancelDelete} onDelete={deleteDocument} />
    </div>
  );
};
