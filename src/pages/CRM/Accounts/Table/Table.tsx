import { FC, useState } from 'react';
import cn from 'classnames';
import { Checkbox } from 'common/ui';
import { DeleteRow } from './DeleteRow';
import { TableRow } from './TableRow';
import styles from './styles.module.scss';

const data = [
  {
    contractNumber: '1234567890',
    bookingNumber: '1234567890',
    paymentStatus: false,
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
        paymentDateSupervisor: '2024-09-26T00:00',
        invoice: ['Счет от TO Peg.png', 'test.png'],
        amount: '100$',
        method: 'Наличными, сом',
        receipt: ['Счет от TO Peg.png', 'test.png'],
        tourAmount: '100$',
        employeeInvoice: ['Счет от TO Peg.png', 'test.png']
      },
      {
        paymentDateClient: '26.09.2024',
        paymentDateSupervisor: '2024-09-26T00:00',
        invoice: ['Счет от TO Peg.png', 'test.png'],
        amount: '100$',
        method: 'Наличными, сом',
        receipt: ['Счет от TO Peg.png', 'test.png'],
        tourAmount: '100$',
        employeeInvoice: ['Счет от TO Peg.png']
      },
      {
        paymentDateClient: '26.09.2024',
        paymentDateSupervisor: '2024-09-26T00:00',
        invoice: ['Счет от TO Peg.png', 'test.png'],
        amount: '100$',
        method: 'Наличными, сом',
        receipt: ['Счет от TO Peg.png', 'test.png'],
        tourAmount: '100$',
        employeeInvoice: ['Счет от TO Peg.png', 'test.png']
      }
    ]
  },
  {
    contractNumber: '1234567890',
    bookingNumber: '1234567890',
    paymentStatus: false,
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
        paymentDateSupervisor: '2024-09-26T00:00',
        invoice: [],
        amount: '100$',
        method: 'Наличными, сом',
        receipt: ['Счет от TO Peg.png'],
        tourAmount: '100$',
        employeeInvoice: ['Счет от TO Peg.png', 'test.png']
      }
    ]
  }
];

export const Table: FC = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedRows(data.map((_, index) => index));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (index: number) => {
    setSelectedRows((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.title}>
              <Checkbox checked={selectAll} onChange={handleSelectAll} />
            </th>
            <th className={styles.title}>номер договора</th>
            <th className={styles.title}>номер брони в СТ</th>
            <th className={cn(styles.title, styles.paymentStatus)}>статус оплаты</th>
            <th className={styles.title}>Брутто</th>
            <th className={styles.title}>Нетто</th>
            <th className={styles.title}>курс</th>
            <th className={styles.title}>комиссия</th>
            <th className={styles.title}>способ оплаты</th>
            <th className={styles.title}>направление</th>
            <th className={styles.title}>даты тура</th>
            <th className={styles.title}>туроператор</th>
            <th className={styles.title}>оплата ТО</th>
            <th className={styles.title}>кем создан</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <TableRow key={index} index={index} isSelected={selectedRows.includes(index)} onSelectRow={handleSelectRow} {...row} />
          ))}
        </tbody>
      </table>
      {selectedRows.length !== 0 && <DeleteRow />}
    </div>
  );
};
