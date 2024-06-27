import { FC, useCallback, useState } from 'react';
import { Checkbox } from 'common/ui';
import { DownloadDelete } from '../DownloadDelete';
import { OriginalTableRow } from './OriginalTableRow';
import styles from './styles.module.scss';

interface OriginalRowData {
  title: string;
  format: string;
}

interface OriginalTableProps {
  originalData: OriginalRowData[];
}

export const OriginalTable: FC<OriginalTableProps> = ({ originalData }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = useCallback(() => {
    setSelectAll((prev) => !prev);
    setSelectedRows(() => (!selectAll ? originalData.map((_, index) => index) : []));
  }, [selectAll, originalData]);

  const handleSelectRow = useCallback((index: number) => {
    setSelectedRows((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  }, []);

  const handleDelete = () => {
    console.log('Удалить', selectedRows);
  };

  const handleDownload = () => {
    console.log('Скачать', selectedRows);
  };

  return (
    <div className={styles.original}>
      <div className={styles.originalHead}>
        <div className={`${styles.originalTitle} ${styles.checkbox}`}>
          <Checkbox checked={selectAll} onChange={handleSelectAll} />
        </div>
        <div className={`${styles.originalTitle} ${styles.naming}`}>название договора</div>
        <div className={`${styles.originalTitle} ${styles.format}`}>формат</div>
      </div>
      <div className={styles.originalBody}>
        {originalData.map((el, index) => (
          <OriginalTableRow
            key={index}
            index={index}
            originalData={el}
            isSelected={selectedRows.includes(index)}
            onSelectRow={handleSelectRow}
          />
        ))}
      </div>
      {selectedRows.length > 0 && <DownloadDelete onDelete={handleDelete} onDownload={handleDownload} />}
    </div>
  );
};
