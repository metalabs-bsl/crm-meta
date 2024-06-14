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
  isPaid: boolean;
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
  employeeInvoice,
  isPaid
}) => {
  const [isEditPaymentInfo, setIsEditPaymentInfo] = useState<boolean>(false);
  const [localIsPaid, setLocalIsPaid] = useState<boolean>(isPaid);
  const [localPaymentDateSupervisor, setLocalPaymentDateSupervisor] = useState<string>(paymentDateSupervisor);
  const [localAmount, setLocalAmount] = useState<string>(amount);
  const [localMethod, setLocalMethod] = useState<string>(method);
  const [localTourAmount, setLocalTourAmount] = useState<string>(tourAmount);
  const [invoiceFiles, setInvoiceFiles] = useState<string[]>(invoice);
  const [receiptFiles, setReceiptFiles] = useState<string[]>(receipt);
  const [employeeInvoiceFiles, setEmployeeInvoiceFiles] = useState<string[]>(employeeInvoice);

  const isEditable = !isEditPaymentInfo;

  const handleEdit = () => {
    setIsEditPaymentInfo((prev) => !prev);
  };

  const handleCheckboxChange = () => {
    setLocalIsPaid((prev) => !prev);
  };

  const handleSave = () => {
    const updatedData = {
      paymentDateSupervisor: localPaymentDateSupervisor,
      invoice: invoiceFiles,
      amount: localAmount,
      method: localMethod,
      receipt: receiptFiles,
      tourAmount: localTourAmount,
      employeeInvoice: employeeInvoiceFiles,
      isPaid: localIsPaid
    };

    console.log(updatedData);
  };

  return (
    <Accordion
      title='Полная оплата'
      className={styles.accordion}
      isEdit={isEditPaymentInfo}
      onEditAction={handleEdit}
      onSaveAction={handleSave}
    >
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
            <th className={styles.title}>оплачено</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className={styles.item}>{paymentDateClient}</th>
            <th className={styles.item}>
              <DatePicker
                className={styles.datepicker}
                disabled={isEditable}
                value={localPaymentDateSupervisor}
                onChange={(e) => {
                  setLocalPaymentDateSupervisor(e.target.value);
                }}
              />
            </th>
            <th className={styles.item}>
              <FilePicker files={invoiceFiles} editable={isEditable} onFilesChange={setInvoiceFiles} />
            </th>
            <th className={styles.item}>
              <Input
                className={styles.inp}
                disabled={isEditable}
                value={localAmount}
                onChange={(e) => {
                  setLocalAmount(e.target.value);
                }}
              />
            </th>
            <th className={styles.item}>
              <Select
                value={localMethod}
                options={payOptions}
                className={styles.select}
                disabled={isEditable}
                onChange={(e) => {
                  setLocalMethod(e.target.value);
                }}
              />
            </th>
            <th className={styles.item}>
              <FilePicker files={receiptFiles} editable={isEditable} onFilesChange={setReceiptFiles} />
            </th>
            <th className={styles.item}>
              <Input
                className={styles.inp}
                disabled={isEditable}
                value={localTourAmount}
                onChange={(e) => {
                  setLocalTourAmount(e.target.value);
                }}
              />
            </th>
            <th className={styles.item}>
              <FilePicker files={employeeInvoiceFiles} editable={isEditable} onFilesChange={setEmployeeInvoiceFiles} />
            </th>
            <th className={styles.item}>
              <Checkbox className={styles.checkbox} checked={localIsPaid} disabled={isEditable} onChange={handleCheckboxChange} />
            </th>
          </tr>
        </tbody>
      </table>
    </Accordion>
  );
};
