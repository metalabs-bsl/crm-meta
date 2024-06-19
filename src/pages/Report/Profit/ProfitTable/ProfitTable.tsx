import { FC } from 'react';
import styles from './ProfitTable.module.scss';

interface ProfitData {
  title: string;
  status: string;
}
interface IProps {
  data: ProfitData[];
}

export const ProfitTable: FC<IProps> = ({ data }) => {
  return (
    <div className={styles.table}>
      <div className={styles.tableHead}>
        <div className={`${styles.tableTitle} ${styles.name}`}>ФИО</div>
        <div className={`${styles.tableTitle} ${styles.status}`}>Статус</div>
      </div>
      <div className={styles.tableBody}>
        {data?.map((el, index) => (
          <div className={styles.tableRow} key={index}>
            <div className={`${styles.bodyBlock} ${styles.bodyName}`}>
              <p className={styles.blockText}>{el.title}</p>
            </div>
            <div className={`${styles.bodyBlock} ${styles.bodyStatus}`}>
              <p className={styles.blockText}>{el.status}</p>
            </div>
            <div className={`${styles.bodyBlock} ${styles.bodyExcel}`}>
              <a href='#' className={styles.btnDownload} download>
                Выгрузить в Excel
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
