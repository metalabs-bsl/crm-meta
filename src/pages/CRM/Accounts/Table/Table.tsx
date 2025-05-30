import { FC, useEffect, useState } from 'react';
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
  const [paymentStatuses, setPaymentStatuses] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setPaymentStatuses((prevStatuses) => {
      const newStatuses = data.reduce(
        (acc, row) => {
          acc[row.id] = prevStatuses[row.id] || row.paymentStatus || 'Не оплачено';
          return acc;
        },
        {} as { [key: string]: string }
      );
      return newStatuses;
    });
  }, [data]);
  const handlePaymentStatusChange = (id: string, newStatus: string) => {
    setPaymentStatuses((prevStatuses) => ({
      ...prevStatuses,
      [id]: newStatus
    }));
  };

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
          {data.length ? (
            data.map((row, index) => (
              <TableRow
                key={index}
                {...row}
                paymentStatus={paymentStatuses[row.id]} // Передаем текущий статус
                onPaymentStatusChange={handlePaymentStatusChange} // Передаем функцию для обновления
              />
            ))
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
