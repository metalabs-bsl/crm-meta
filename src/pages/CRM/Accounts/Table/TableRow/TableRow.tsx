// TableRow.tsx
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Empty } from 'common/ui';
import { Accordion, DropdownModal } from 'common/components';
import { IAccountData } from 'types/entities/accounts';
import { formatDate } from '../../Account.helper';
import { ContractModal } from './ContractModal';
import { PaymentRow } from './PaymentRow';
import styles from './styles.module.scss';

interface ITableRowProps extends IAccountData {
  paymentStatus: string;
  onPaymentStatusChange: (id: string, newStatus: string) => void;
}

export const TableRow: FC<ITableRowProps> = ({
  id,
  contractNumber,
  bookingNumber,
  gross,
  net,
  commission,
  destination,
  tourDates,
  tourOperator,
  tourInvoiceSom,
  tourInvoiceUSD,
  tourInvoiceEUR,
  whoCreated,
  paymentDetails,
  paymentStatus, // из родительского компонента
  customer,
  onPaymentStatusChange
}) => {
  const navigate = useNavigate();
  const contractNumberRef = useRef<HTMLSpanElement | null>(null);
  const [contractOpen, setContractOpen] = useState<boolean>(false);

  // где предполагается, что каждый элемент имеет поле isPaid (boolean)
  const computedPaymentStatus = useMemo(() => {
    if (!paymentDetails.length) return 'Не оплачено';
    const allPaid = paymentDetails.every((payment) => payment.isPaid);
    const nonePaid = paymentDetails.every((payment) => !payment.isPaid);
    if (allPaid) return 'Оплачено';
    if (nonePaid) return 'Не оплачено';
    return 'Частично';
  }, [paymentDetails]);

  // Если вычисленный статус изменился, уведомляем родительский компонент.
  useEffect(() => {
    if (computedPaymentStatus !== paymentStatus) {
      onPaymentStatusChange(id, computedPaymentStatus);
    }
  }, [computedPaymentStatus, id, onPaymentStatusChange, paymentStatus]);

  // Функция навигации при клике на номер контракта
  const onContractClick = () => {
    navigate(`/crm/transactions?${id}`);
  };

  return (
    <>
      <tr className={cn(styles.mainRow, { [styles.checkedRow]: computedPaymentStatus === 'Оплачено' })}>
        <td className={styles.item}>
          <span
            className={styles.contractNumber}
            onMouseEnter={() => setContractOpen(true)}
            onMouseLeave={() => setContractOpen(false)}
            onClick={onContractClick}
            ref={contractNumberRef}
          >
            {contractNumber || '-'}
          </span>
        </td>
        <td className={styles.item}>{bookingNumber || '-'}</td>
        <td className={cn(styles.item, styles.paymentStatus)}>
          {/* Отображаем вычисленный статус */}
          <span
            className={cn({
              [styles.not_paid]: computedPaymentStatus === 'Не оплачено',
              [styles.paid]: computedPaymentStatus === 'Оплачено',
              [styles.partial]: computedPaymentStatus === 'Частично'
            })}
          >
            {computedPaymentStatus || '-'}
          </span>
        </td>
        <td className={styles.item}>{gross || '-'}</td>
        <td className={styles.item}>{net || '-'}</td>
        <td className={styles.item}>{commission || '-'}</td>
        <td className={styles.item}>{destination || '-'}</td>
        <td className={cn(styles.item, styles.item_date)}>{formatDate(tourDates) || '-'}</td>
        <td className={styles.item}>{tourOperator || '-'}</td>
        <td className={styles.item}>{tourInvoiceSom || '-'}</td>
        <td className={styles.item}>{tourInvoiceUSD || '-'}</td>
        <td className={styles.item}>{tourInvoiceEUR || '-'}</td>
        <td className={styles.item}>{whoCreated || '-'}</td>
      </tr>
      <tr className={styles.accordionRow}>
        <td colSpan={14} className={styles.accordionContainer}>
          <Accordion className={styles.accordion} title='Информация об оплате'>
            <div className={styles.expandedContent}>
              {!!paymentDetails.length ? (
                // PaymentRow должен содержать логику изменения isPaid для каждого платежа
                paymentDetails.map((details) => <PaymentRow {...details} key={details.id} />)
              ) : (
                <Empty />
              )}
            </div>
          </Accordion>
        </td>
      </tr>
      <DropdownModal targetRef={contractNumberRef} isOpen={contractOpen} onClose={() => setContractOpen(false)}>
        <ContractModal
          name={customer?.fullname || '-'}
          phone={customer?.phone || '-'}
          city={customer?.city || '-'}
          source={customer?.source || '-'}
          dateOfBirth={customer?.date_of_birth ? customer.date_of_birth.split('T')[0].split('-').reverse().join('.') : '-'}
        />
      </DropdownModal>
      <tr className={styles.marginRow}></tr>
    </>
  );
};
