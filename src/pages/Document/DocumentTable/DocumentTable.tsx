import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'common/ui';
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
          <div className={styles.bodyTr} key={index}>
            <div className={`${styles.bodyTd} ${styles.naming}`}>{el.title}</div>
            <Link className={`${styles.bodyTd} ${styles.format}`} target='_blank' to='https://www.youtube.com/watch?v=u31qwQUeGuM'>
              {el.file}
            </Link>
            <div className={`${styles.bodyTd} ${styles.action}`}>
              <div className={styles.iconsWrapper}>
                <span className={styles.downloadIcon}>
                  <Icon type='download' />
                </span>
                <span className={styles.deleteIcon}>
                  <Icon type='delete' />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
