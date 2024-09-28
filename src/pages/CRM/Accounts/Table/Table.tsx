import { FC } from 'react';
import cn from 'classnames';
import { Empty } from 'common/ui';
import { IAccountData } from 'types/entities/accounts';
import { mainRowHeaders } from '../Account.helper';
import { TableRow } from './TableRow';
import styles from './styles.module.scss';

interface ITableProps {
  data: IAccountData[];
}

export const Table: FC<ITableProps> = ({ data }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tableRow}>
            {mainRowHeaders.map((header, idx) => (
              <th key={idx} className={cn(header.classNames.map((el) => `${styles[el]}`).join(' '))}>
                {header.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {[].length ? (
            data.map((row, index) => <TableRow key={index} {...row} />)
          ) : (
            <tr>
              <td colSpan={13}>
                <Empty />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
