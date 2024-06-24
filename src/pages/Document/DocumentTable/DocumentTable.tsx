import { FC, useCallback, useState } from 'react';
import { Checkbox } from 'common/ui';
import { DocumentTableRow } from './DocumentTableRow';
import styles from './Document.module.scss';

interface DocumentData {
  id: string;
  title: string;
  file: string;
}

interface IProps {
  data: DocumentData[];
}

export const DocumentTable: FC<IProps> = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = useCallback(() => {
    setSelectAll((prev) => !prev);
    setSelectedRows(() => (!selectAll ? data.map((_, index) => index) : []));
  }, [selectAll, data]);

  const handleSelectRow = useCallback((index: number) => {
    setSelectedRows((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  }, []);

  return (
    <div className={styles.table}>
      <div className={styles.thead}>
        <Checkbox checked={selectAll} onChange={handleSelectAll} />
        <div className={`${styles.headTd} ${styles.id}`}>Номер договора</div>
        <div className={`${styles.headTd} ${styles.naming}`}>Название</div>
        <div className={`${styles.headTd} ${styles.format}`}>Формат</div>
        <div className={`${styles.headTd} ${styles.action}`}>действие</div>
      </div>
      <div className={styles.tbody}>
        {data.map((el, index) => (
          <DocumentTableRow key={index} index={index} data={el} isSelected={selectedRows.includes(index)} onSelectRow={handleSelectRow} />
        ))}
      </div>
    </div>
  );
};
