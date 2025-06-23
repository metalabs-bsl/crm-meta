import { FC, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { Checkbox, FilePicker, Icon, Select } from 'common/ui';
import { Accordion } from 'common/components';
import { useNotify } from 'common/hooks';
import { MESSAGE, paymentOptions } from 'common/constants';
import { useUpdateInvoiceMutation } from 'api/admin/accounts/accounts.api';
import { useUpdateLeadCalcPaidStatusMutation } from 'api/admin/leads/endpoints/calculator';
import { Options } from 'types/common';
import { IPaymentDetailsData } from 'types/entities/accounts';
import { paymentRowHeaders } from '../../../Account.helper';
import styles from './styles.module.scss';

const currencyOptions: Options[] = [
  { value: 1, label: 'сом' },
  { value: 2, label: 'доллар' },
  { value: 3, label: 'евро' }
];

export interface IPaymentRowProps extends IPaymentDetailsData {
  globalPaymentStatus: string;
  calcId?: string;
  onPaymentStatusChange?: (id: string, newStatus: string) => void; // Новый пропс
  accountId?: string; // Новый пропс
}

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
  globalPaymentStatus,
  invoice,
  receipt,
  paymentTOType,
  calcId,
  onPaymentStatusChange,
  accountId
}) => {
  const notify = useNotify();
  const [updateInvoice] = useUpdateInvoiceMutation();
  const [updateLeadCalcPaidStatus] = useUpdateLeadCalcPaidStatusMutation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [localIsPaid, setLocalIsPaid] = useState<boolean>(globalPaymentStatus === 'Оплачено');
  const [localPaymentTOType, setLocalPaymentTOType] = useState<number>(paymentTOType || 1);
  const [localPaymentDateSupervisor, setLocalPaymentDateSupervisor] = useState<string>(paymentDateSupervisor?.split('T')[0] || '');
  const [localTourAmount, setLocalTourAmount] = useState<string>(tourAmount || '');
  const [receiptLocal, setReceiptLocal] = useState<{ id: string; original_name: string } | null>(receipt);
  const [receiptLocalFile, setReceiptLocalFile] = useState<File | null>(null);

  useEffect(() => {
    setLocalIsPaid(globalPaymentStatus === 'Оплачено');
  }, [globalPaymentStatus]);

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
      id,
      paymentDateSupervisor: localPaymentDateSupervisor,
      tourAmount: localTourAmount,
      isPaid: localIsPaid,
      paymentTOType: localPaymentTOType
    };

    formData.append('invoiceInfo', JSON.stringify(updatedData));

    if (receiptLocalFile) {
      formData.append('receipt', receiptLocalFile);
    }

    try {
      await updateInvoice(formData).unwrap();

      if (calcId && accountId) {
        const newStatus = localIsPaid ? 'Оплачено' : 'Не оплачено';
        await updateLeadCalcPaidStatus({ calc_id: calcId, paid_status: newStatus }).unwrap();
        onPaymentStatusChange?.(accountId, newStatus);
      }
      notify(MESSAGE.SUCCESS, 'success');
      setIsEdit(false);
    } catch (error) {
      notify(MESSAGE.ERROR, 'error');
    }
  };

  return (
    <Accordion
      title={name}
      className={styles.accordion}
      isEdit={isEdit}
      onEditAction={handleEdit}
      onSaveAction={handleSave}
      isOpenDefault={true}
    >
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {paymentRowHeaders.map((header, idx) => (
              <th key={idx} className={header.classNames.map((el) => styles[el]).join(' ')}>
                {header.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={cn(styles.item, styles.checkboxWrapper)}>
              <Checkbox className={styles.checkboxItem} checked={localIsPaid} disabled={!isEdit} onChange={handleCheckboxChange} />
            </td>
            <td className={styles.item}>{paymentDateClient || 'null'}</td>
            <td className={styles.item}>{comment || 'null'}</td>
            <td className={styles.item}>
              <input
                type='date'
                className={styles.inp}
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
                className={cn(styles.inp, styles.inp_tourAmount)}
                disabled={!isEdit}
                value={localTourAmount}
                onChange={(e) => setLocalTourAmount(e.target.value)}
              />
            </td>
            <td className={styles.item}>
              <Select
                options={currencyOptions}
                disabled={!isEdit}
                value={localPaymentTOType}
                onChange={(e) => setLocalPaymentTOType(Number(e.target.value))}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </Accordion>
  );
};
