import { FC, useState } from 'react';
import { Checkbox, DatePicker, Input, Select } from 'common/ui';
import { Accordion } from 'common/components';
import { FilePicker } from './FilePicker';
import styles from './styles.module.scss';

export interface PaymentRowProps {
  paymentDateClient: string;
  paymentDateSupervisor: string;
  invoice: string[];
  amount: string;
  method: string;
  receipt: string[];
  tourAmount: string;
  employeeInvoice: string[];
}

const payOptions = [
  {
    title: 'Наличными, сом',
    value: 'som'
  },
  {
    title: 'Наличными, $',
    value: 'usd'
  },
  {
    title: 'Наличными, €',
    value: 'eur'
  },
  {
    title: 'Переводом',
    value: 'transaction'
  },
  {
    title: 'Через банк',
    value: 'bank'
  }
];

export const PaymentRow: FC<PaymentRowProps> = ({
  paymentDateClient,
  paymentDateSupervisor,
  invoice,
  amount,
  method,
  receipt,
  tourAmount,
  employeeInvoice
}) => {
  const [isEditPaymentInfo, setIsEditPaymentInfo] = useState<boolean>(false);
  const isEditable = !isEditPaymentInfo;

  const handleEdit = () => {
    setIsEditPaymentInfo((prev) => !prev);
  };

  return (
    <Accordion title='Полная оплата' className={styles.accordion} isEdit={isEditPaymentInfo} onEditAction={handleEdit}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.title}>СО клиента</th>
            <th className={styles.title}>СО руководителя</th>
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
            <th className={styles.item}>{paymentDateClient}</th>
            <th className={styles.item}>
              <DatePicker className={styles.datepicker} disabled={isEditable} value={paymentDateSupervisor} />
            </th>
            <th className={styles.item}>
              <FilePicker files={invoice} editable={isEditable} />
            </th>
            <th className={styles.item}>
              <Input className={styles.inp} disabled={isEditable} value={amount} />
            </th>
            <th className={styles.item}>
              <Select value={method} options={payOptions} className={styles.select} disabled={isEditable} />
            </th>
            <th className={styles.item}>
              <FilePicker files={receipt} editable={isEditable} />
            </th>
            <th className={styles.item}>
              <Input className={styles.inp} disabled={isEditable} value={tourAmount} />
            </th>
            <th className={styles.item}>
              <FilePicker files={employeeInvoice} editable={isEditable} />
            </th>
            <th className={styles.item}>
              <Checkbox />
            </th>
          </tr>
        </tbody>
      </table>
    </Accordion>
  );
};
