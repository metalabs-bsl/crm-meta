import { FC } from 'react';
import { Accordion } from 'common/components';
import styles from './styles.module.scss';

export interface PaymentRowProps {
  paymentDate: string;
  invoice: string;
  amount: string;
  method: string;
  receipt: string;
  tourAmount: string;
  employeeInvoice: string;
}

export const PaymentRow: FC<PaymentRowProps> = ({ paymentDate, invoice, amount, method, receipt, tourAmount, employeeInvoice }) => {
  return (
    <Accordion title='Полная оплата' className={styles.accordion}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.title}>срок оплаты</th>
            <th className={styles.title}>счёт от ТО</th>
            <th className={styles.title}>сумма оплаты</th>
            <th className={styles.title}>способ оплаты</th>
            <th className={styles.title}>квитанция от ТО</th>
            <th className={styles.title}>оплата ТО</th>
            <th className={styles.title}>счёт от сотрудника</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className={styles.item}>{paymentDate}</th>
            <th className={styles.item}>{invoice}</th>
            <th className={styles.item}>{amount}</th>
            <th className={styles.item}>{method}</th>
            <th className={styles.item}>{receipt}</th>
            <th className={styles.item}>{tourAmount}</th>
            <th className={styles.item}>{employeeInvoice}</th>
            <th>
              <input type='checkbox' />
            </th>
          </tr>
        </tbody>
      </table>
    </Accordion>
  );
};
