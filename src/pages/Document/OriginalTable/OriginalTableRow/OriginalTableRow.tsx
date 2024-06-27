import { FC, useState } from 'react';
import { Checkbox, Icon } from 'common/ui';
import styles from './styles.module.scss';

interface OriginalRowData {
  title: string;
  format: string;
}

interface OriginalTableRowProps {
  index: number;
  originalData: OriginalRowData;
  isSelected: boolean;
  onSelectRow: (index: number) => void;
}

export const OriginalTableRow: FC<OriginalTableRowProps> = ({ index, originalData, isSelected, onSelectRow }) => {
  const { title, format } = originalData;
  const [fileDropDown, setFileDropDown] = useState(false);

  const handleClickFileDropDown = () => {
    setFileDropDown((prev) => !prev);
  };

  return (
    <div className={styles.originalRow}>
      <div className={`${styles.rowTitle} ${styles.checkbox}`}>
        <Checkbox checked={isSelected} onChange={() => onSelectRow(index)} />
      </div>
      <div className={`${styles.rowTitle} ${styles.naming}`}>
        <p>{title}</p>
      </div>
      <div className={`${styles.rowTitle} ${styles.format}`}>
        <div className={`${styles.dropDown} ${styles.bodyTd} ${styles.format}`}>
          <span className={`${styles.btn} ${fileDropDown ? styles.activeBtn : ''}`} onClick={handleClickFileDropDown}>
            pdf
            <Icon className={`${styles.arrow} ${fileDropDown ? styles.arrowActive : ''}`} type='arrow-down' alt='arrow' />
          </span>
          <div className={`${styles.content} ${fileDropDown ? styles.contentActive : ''}`}>
            <p className={styles.fileType}>{format}</p>
            <p className={styles.fileType}>{format}</p>
            <p className={styles.fileType}>{format}</p>
            <p className={styles.fileType}>{format}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
