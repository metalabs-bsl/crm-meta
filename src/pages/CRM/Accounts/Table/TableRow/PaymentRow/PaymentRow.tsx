import { FC, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { Checkbox, FilePicker, Icon, Select } from 'common/ui';
import { Accordion } from 'common/components';
import { useNotify } from 'common/hooks';
import { MESSAGE, paymentOptions } from 'common/constants';
import { useUpdateInvoiceMutation } from 'api/admin/accounts/accounts.api';
import { Options } from 'types/common';
import { IPaymentDetailsData } from 'types/entities/accounts';
import { paymentRowHeaders } from '../../../Account.helper';
import styles from './styles.module.scss';

const currencyOptions: Options[] = [
  {
    value: 'сом',
    label: 'сом'
  },
  {
    value: 'доллар',
    label: 'доллар'
  },
  {
    value: 'евро',
    label: 'евро'
  }
];

export interface IPaymentRowProps extends IPaymentDetailsData {}

export const PaymentRow: FC<IPaymentRowProps> = ({
  id,
  name,
  paymentDateClient,
  paymentDateSupervisor,
  comment,
  amount,
  tourAmount,
  method,
  rate,
  isPaid,
  invoice,
  receipt
}) => {
  const notify = useNotify();
  const [updateInvoice] = useUpdateInvoiceMutation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [localIsPaid, setLocalIsPaid] = useState<boolean>(isPaid);
  const [localPaymentDateSupervisor, setLocalPaymentDateSupervisor] = useState<string>(paymentDateSupervisor?.split('T')[0]);
  const [localTourAmount, setLocalTourAmount] = useState<string>(tourAmount || '');
  const [receiptLocal, setReceiptLocal] = useState<{ id: string; original_name: string } | null>(receipt);
  const [receiptLocalFile, setReceiptLocalFile] = useState<File | null>(null);

  useEffect(() => {
    setReceiptLocal(receipt);
  }, [receipt]);

  const handleEdit = useCallback(() => {
    setIsEdit((prev) => !prev);
  }, []);

  const handleCheckboxChange = useCallback(() => {
    setLocalIsPaid((prev) => !prev);
  }, []);

  const handleSave = async () => {
    const formData = new FormData();

    const updatedData = {
      id: id,
      paymentDateSupervisor: localPaymentDateSupervisor,
      tourAmount: localTourAmount,
      isPaid: localIsPaid
    };

    formData.append('invoiceInfo', JSON.stringify(updatedData));

    if (receiptLocalFile) {
      formData.append(`receipt`, receiptLocalFile);
    }

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      await updateInvoice(formData).unwrap();
      notify(MESSAGE.SUCCESS, 'success');
    } catch (error) {
      notify(MESSAGE.ERROR, 'error');
    } finally {
      setIsEdit(false);
    }
  };

  return (
    <Accordion title={name} className={styles.accordion} isEdit={isEdit} onEditAction={handleEdit} onSaveAction={handleSave}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {paymentRowHeaders.map((header, idx) => (
              <th key={idx} className={header.classNames.map((el) => `${styles[el]}`).join(' ')}>
                {header.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.item}>{paymentDateClient || 'null'}</td>
            <td className={styles.item}>{comment || 'null'}</td>
            <td className={styles.item}>
              <input
                type='date'
                className={styles.datepicker}
                disabled={!isEdit}
                value={localPaymentDateSupervisor}
                onChange={(e) => setLocalPaymentDateSupervisor(e.target.value)}
              />
            </td>
            <td className={cn(styles.item, styles.fileItem)}>
              <div className={styles.file}>
                <a href={`${process.env.REACT_APP_BASE_URL}/files/download/${invoice?.id}`} download target='_blank' rel='noreferrer'>
                  {invoice?.original_name}
                </a>
              </div>
            </td>
            <td className={styles.item}>{amount || 'null'}</td>
            <td className={styles.item}>{paymentOptions.find((el) => el.value === method)?.label || 'null'}</td>
            <td className={styles.item}>{rate || 'null'}</td>
            <td className={cn(styles.item, styles.fileItem)}>
              {receiptLocal ? (
                <div className={styles.file}>
                  <a href={`${process.env.REACT_APP_BASE_URL}/files/download/${receiptLocal.id}`} download target='_blank' rel='noreferrer'>
                    {receiptLocal.original_name}
                  </a>
                  {isEdit && <Icon type={'delete'} onClick={() => setReceiptLocal(null)} />}
                </div>
              ) : (
                <FilePicker className={styles.fileInput} onChange={setReceiptLocalFile} disabled={!isEdit} />
              )}
            </td>
            <td className={styles.item}>
              <input
                className={styles.inp}
                disabled={!isEdit}
                value={localTourAmount}
                onChange={(e) => setLocalTourAmount(e.target.value)}
              />
            </td>
            <td className={styles.item}>
              <Select options={currencyOptions} />
            </td>
            <td className={cn(styles.item, styles.checkboxWrapper)}>
              <Checkbox className={styles.checkboxItem} checked={localIsPaid} disabled={!isEdit} onChange={handleCheckboxChange} />
            </td>
          </tr>
        </tbody>
      </table>
    </Accordion>
  );
};
