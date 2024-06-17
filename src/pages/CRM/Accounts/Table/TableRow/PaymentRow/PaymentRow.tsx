import { FC, useCallback, useState } from 'react';
import cn from 'classnames';
import { Checkbox, DatePicker, Input, Select } from 'common/ui';
import { Accordion, MultipleFilePicker } from 'common/components';
import { paymentRowHeaders } from '../../../Account.helper';
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
  accordionTitle: string;
}

const payOptions = [
  { title: 'Наличными, сом', value: 'som' },
  { title: 'Наличными, $', value: 'usd' },
  { title: 'Наличными, €', value: 'eur' },
  { title: 'Переводом', value: 'transaction' },
  { title: 'Через банк', value: 'bank' }
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
  isPaid,
  accordionTitle
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

  const handleEdit = useCallback(() => {
    setIsEditPaymentInfo((prev) => !prev);
  }, []);

  const handleCheckboxChange = useCallback(() => {
    setLocalIsPaid((prev) => !prev);
  }, []);

  const handleSave = useCallback(() => {
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
  }, [
    localPaymentDateSupervisor,
    invoiceFiles,
    localAmount,
    localMethod,
    receiptFiles,
    localTourAmount,
    employeeInvoiceFiles,
    localIsPaid
  ]);

  return (
    <Accordion
      title={accordionTitle}
      className={styles.accordion}
      isEdit={isEditPaymentInfo}
      onEditAction={handleEdit}
      onSaveAction={handleSave}
    >
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {paymentRowHeaders.map((header, idx) => (
              <th key={idx} className={cn(header.classNames.map((el) => `${styles[el]}`).join(' '))}>
                {header.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.item}>{paymentDateClient}</td>
            <td className={styles.item}>
              <DatePicker
                className={styles.datepicker}
                disabled={isEditable}
                value={localPaymentDateSupervisor}
                onChange={(e) => setLocalPaymentDateSupervisor(e.target.value)}
              />
            </td>
            <td className={styles.item}>
              <MultipleFilePicker files={invoiceFiles} editable={isEditable} onFilesChange={setInvoiceFiles} />
            </td>
            <td className={styles.item}>
              <Input className={styles.inp} disabled={isEditable} value={localAmount} onChange={(e) => setLocalAmount(e.target.value)} />
            </td>
            <td className={styles.item}>
              <Select
                value={localMethod}
                options={payOptions}
                className={styles.select}
                disabled={isEditable}
                onChange={(e) => setLocalMethod(e.target.value)}
              />
            </td>
            <td className={styles.item}>
              <MultipleFilePicker files={receiptFiles} editable={isEditable} onFilesChange={setReceiptFiles} />
            </td>
            <td className={styles.item}>
              <Input
                className={styles.inp}
                disabled={isEditable}
                value={localTourAmount}
                onChange={(e) => setLocalTourAmount(e.target.value)}
              />
            </td>
            <td className={styles.item}>
              <MultipleFilePicker files={employeeInvoiceFiles} editable={isEditable} onFilesChange={setEmployeeInvoiceFiles} />
            </td>
            <td className={cn(styles.item, styles.checkboxWrapper)}>
              <Checkbox className={styles.checkboxItem} checked={localIsPaid} disabled={isEditable} onChange={handleCheckboxChange} />
            </td>
          </tr>
        </tbody>
      </table>
    </Accordion>
  );
};
