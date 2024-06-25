import { FC, useState } from 'react';
import { Checkbox, Icon } from 'common/ui';
import { DeleteModal } from 'common/components';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import styles from './styles.module.scss';

interface IFile {
  id: string;
  name: string;
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
  const { id, name, title, file } = data;

  const [fileDropDown, setFileDropDown] = useState(false);

  const handleCLickFileDropDown = () => {
    setFileDropDown((prev) => !prev);
  };
  const cancelDelete = () => {
    setDelOpen(false);
  };

  const deleteDocument = () => {
    notification(MESSAGE.DELETED);
    setDelOpen(false);
  };

  return (
    <div className={styles.bodyTr}>
      <div className={styles.rowCheckbox}>
        <Checkbox checked={isSelected} onChange={() => onSelectRow(index)} />
      </div>
      <div className={`${styles.bodyTd} ${styles.id}`}>{id}</div>
      <div className={`${styles.bodyTd} ${styles.name}`}>{name}</div>
      <div className={`${styles.bodyTd} ${styles.naming}`}>{title}</div>
      <div className={`${styles.dropDown} ${styles.bodyTd} ${styles.format}`}>
        <span className={`${styles.btn} ${fileDropDown ? styles.activeBtn : ''}`} onClick={handleCLickFileDropDown}>
          pdf
          <Icon className={`${styles.arrow} ${fileDropDown ? styles.arrowActive : ''}`} type={'arrow-down'} alt='arrow' />
        </span>
        <div className={`${styles.content} ${fileDropDown ? styles.contentActive : ''}`}>
          <p className={styles.fileType}>{file}</p>
          <p className={styles.fileType}>{file}</p>
          <p className={styles.fileType}>{file}</p>
          <p className={styles.fileType}>{file}</p>
        </div>
      </div>
      {/* <div className={`${styles.bodyTd} ${styles.action}`}>
        <div className={styles.iconsWrapper}>
          <a href='#' className={styles.downloadIcon} download={test}>
            <Icon type='download' />
          </a>
          <span className={styles.deleteIcon}>
            <Icon type='delete' onClick={() => setDelOpen(true)} />
          </span>
        </div>
      </div> */}
      <DeleteModal text={`Вы точно хотите удалить "${title}"`} isOpen={delOpen} onCancel={cancelDelete} onDelete={deleteDocument} />
    </div>
  );
};
