import { FC, useCallback, useState } from 'react';
import { Checkbox } from 'common/ui';
import { DeleteModal } from 'common/components';
import { DownloadDelete } from '../DownloadDelete';
import { DocumentTableRow } from './DocumentTableRow';
import styles from './Document.module.scss';

interface DocumentData {
  id: string;
  name: string;
  title: string;
  file: string;
}

interface IProps {
  data: DocumentData[];
}

export const DocumentTable: FC<IProps> = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const handleSelectAll = useCallback(() => {
    setSelectAll((prev) => !prev);
    setSelectedRows(() => (!selectAll ? data.map((_, index) => index) : []));
  }, [selectAll, data]);

  const handleSelectRow = useCallback((index: number) => {
    setSelectedRows((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  }, []);

  const handleDownload = () => {
    console.log('Скачать', selectedRows);
  };

  const handleDelete = useCallback(() => {
    setOpenDeleteModal(true);
  }, []);

  return (
    <div className={styles.tableContainer}>
      <div className={styles.table}>
        <div className={styles.thead}>
          <div className={styles.theadCheckbox}>
            <Checkbox checked={selectAll} onChange={handleSelectAll} />
          </div>
          <div className={`${styles.headTd} ${styles.id}`}>номер договора</div>
          <div className={`${styles.headTd} ${styles.name}`}>ФИО</div>
          <div className={`${styles.headTd} ${styles.naming}`}>название договора</div>
          <div className={`${styles.headTd} ${styles.format}`}>формат</div>
        </div>
        <div className={styles.tbody}>
          {data.map((el, index) => (
            <DocumentTableRow key={index} index={index} data={el} isSelected={selectedRows.includes(index)} onSelectRow={handleSelectRow} />
          ))}
        </div>
      </div>
      {selectedRows.length > 0 && <DownloadDelete onDelete={handleDelete} onDownload={handleDownload} />}
      <DeleteModal
        isOpen={openDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        text={`Вы уверены, что хотите удалить счёт "${selectedRows}"?`}
        onDelete={handleDelete}
      />
    </div>
  );
};
