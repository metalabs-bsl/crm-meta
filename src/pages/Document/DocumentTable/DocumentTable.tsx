import { FC } from 'react';
import { DocumentTableRow } from './DocumentTableRow';
import styles from './Document.module.scss';

interface DocumentData {
  title: string;
  file: string;
}

interface IProps {
  data: DocumentData[];
}

export const DocumentTable: FC<IProps> = ({ data }) => {
  return (
    <div className={styles.table}>
      <div className={styles.thead}>
        <div className={`${styles.headTd} ${styles.naming}`}>Название</div>
        <div className={`${styles.headTd} ${styles.format}`}>Формат</div>
        <div className={`${styles.headTd} ${styles.action}`}>действие</div>
      </div>
      <div className={styles.tbody}>
        {data.map((el, index) => (
          <DocumentTableRow key={index} data={el} />
        ))}
      </div>
    </div>
  );
};
