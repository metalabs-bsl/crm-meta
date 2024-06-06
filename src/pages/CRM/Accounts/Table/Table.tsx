import { FC } from 'react';
import { TableRow } from './TableRow';
import styles from './styles.module.scss';

const data = [
  {
    contractNumber: '1234567890',
    bookingNumber: '1234567890',
    paymentStatus: 'Не оплачено',
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
        paymentDate: '26.09.2024',
        invoice: 'Счет от TO Peg...png',
        amount: '100$',
        method: 'Наличными, сом',
        receipt: 'Счет от TO Peg...png',
        tourAmount: '100$',
        employeeInvoice: 'Счет от TO Peg...png'
      }
    ]
  }
];

export const Table: FC = () => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>&#10004</th>
          <th>номер договора</th>
          <th>номер брони в СТ</th>
          <th>статус оплаты</th>
          <th>Брутто</th>
          <th>Нетто</th>
          <th>курс</th>
          <th>комиссия</th>
          <th>способ оплаты</th>
          <th>направление</th>
          <th>даты тура</th>
          <th>туроператор</th>
          <th>счёт от ТО</th>
          <th>кем создан</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <TableRow key={index} {...row} />
        ))}
      </tbody>
    </table>
  );
};
