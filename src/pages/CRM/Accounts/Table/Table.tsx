import { FC, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { mainRowHeaders } from '../Account.helper';
import { TableRowData } from '../types/tableRowData';
import { TableRow } from './TableRow';
import styles from './styles.module.scss';

const data: TableRowData[] = [
  {
    contractNumber: '1234567890',
    bookingNumber: '1234567890',
    gross: '800.80$',
    net: '800.80$',
    rate: '83$',
    commission: '20$',
    paymentMethod: 'Переводом',
    destination: 'Алматы',
    tourDates: '10.05.2024-13.05.2024',
    tourOperator: 'Pegasus Asia',
    tourInvoice: '300$',
    whoCreated: 'Азатов Азат',
    paymentDetails: [
      {
        paymentDateClient: '26.09.2024',
        comment: 'Срок оплаты руководителя 26 июля',
        paymentDateSupervisor: '2024-09-26T00:00',
        invoice: [],
        amount: '100$',
        method: 'Наличными, сом',
        receipt: [],
        tourAmount: '100$',
        employeeInvoice: [],
        isPaid: true
      },
      {
        paymentDateClient: '26.09.2024',
        comment: 'Срок оплаты руководителя 26 июля',
        paymentDateSupervisor: '2024-09-26T00:00',
        invoice: [],
        amount: '100$',
        method: 'Наличными, сом',
        receipt: [],
        tourAmount: '100$',
        employeeInvoice: [],
        isPaid: true
      },
      {
        paymentDateClient: '26.09.2024',
        comment: 'Срок оплаты руководителя 26 июля',
        paymentDateSupervisor: '2024-09-26T00:00',
        invoice: [],
        amount: '100$',
        method: 'Наличными, сом',
        receipt: [],
        tourAmount: '100$',
        employeeInvoice: [],
        isPaid: false
      }
    ]
  },
  {
    contractNumber: '1234567890',
    bookingNumber: '1234567890',
    gross: '800.80$',
    net: '800.80$',
    rate: '83$',
    commission: '20$',
    paymentMethod: 'Переводом',
    destination: 'Алматы',
    tourDates: '10.05.2024-13.05.2024',
    tourOperator: 'Pegasus Asia',
    tourInvoice: '300$',
    whoCreated: 'Азатов Азат',
    paymentDetails: [
      {
        paymentDateClient: '26.09.2024',
        comment: 'Срок оплаты руководителя 26 июля',
        paymentDateSupervisor: '2024-09-26T00:00',
        invoice: [],
        amount: '100$',
        method: 'Наличными, сом',
        receipt: [],
        tourAmount: '100$',
        employeeInvoice: [],
        isPaid: true
      }
    ]
  }
];

export const Table: FC = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [localData, setLocalData] = useState<TableRowData[]>([]);

  const handleSelectRow = useCallback((index: number) => {
    setSelectedRows((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  }, []);

  useEffect(() => {
    setLocalData(data);
  }, []);

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
        <tbody>
          {localData.map((row, index) => (
            <TableRow key={index} index={index} isSelected={selectedRows.includes(index)} onSelectRow={handleSelectRow} {...row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
