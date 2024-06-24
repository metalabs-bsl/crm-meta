import { FC, useState } from 'react';
import { Checkbox, Icon } from 'common/ui';
import { DeleteModal } from 'common/components';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import test from '../assets/test.png';
import styles from '../Document.module.scss';

interface IFile {
  id: string;
  title: string;
  file: string;
}

interface IProps {
  index: number;
  data: IFile;
  isSelected: boolean;
  onSelectRow: (index: number) => void;
}

export const DocumentTableRow: FC<IProps> = ({ index, data, isSelected, onSelectRow }) => {
  const notification = useNotify();
  const [delOpen, setDelOpen] = useState<boolean>(false);
  const { id, title, file } = data;

  const cancelDelete = () => {
    setDelOpen(false);
  };

  const deleteDocument = () => {
    notification(MESSAGE.DELETED);
    setDelOpen(false);
  };

  return (
    <div className={styles.bodyTr}>
      <Checkbox checked={isSelected} onChange={() => onSelectRow(index)} />
      <div className={`${styles.bodyTd} ${styles.id}`}>{id}</div>
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
