import { FC, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Empty } from 'common/ui';
import { Accordion, DropdownModal } from 'common/components';
import { IAccountData } from 'types/entities/accounts';
import { formatDate } from '../../Account.helper';
import { ContractModal } from './ContractModal';
import { PaymentRow } from './PaymentRow';
import styles from './styles.module.scss';

interface ITableRowProps extends IAccountData {}

export const TableRow: FC<ITableRowProps> = ({
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
  paymentStatus,
  customer
}) => {
  const navigate = useNavigate();
  const contractNumberRef = useRef(null);
  const [contractOpen, setContractOpen] = useState<boolean>(false);
  const allChecked = useMemo(() => paymentDetails.every((payment) => payment.isPaid), [paymentDetails]);

  const onContractCLick = () => {
    navigate(`/crm/transactions?97b93969-e512-423e-af27-05ede9c89640`);
  };

  return (
    <>
      <tr className={cn(styles.mainRow, { [styles.checkedRow]: allChecked })}>
        <td className={styles.item}>
          <span
            className={styles.contractNumber}
            onMouseEnter={() => setContractOpen(true)}
            onMouseLeave={() => setContractOpen(false)}
            onClick={onContractCLick}
            ref={contractNumberRef}
          >
            {contractNumber || '-'}
          </span>
        </td>
        <td className={styles.item}>{bookingNumber || '-'}</td>
        <td className={cn(styles.item, styles.paymentStatus)}>
          <span
            className={cn({
              [styles.not_paid]: paymentStatus === 'Не оплачено',
              [styles.paid]: paymentStatus === 'Оплачено',
              [styles.partial]: paymentStatus === 'Частично'
            })}
          >
            {paymentStatus || '-'}
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
              {!!paymentDetails.length ? paymentDetails.map((details) => <PaymentRow {...details} key={details.id} />) : <Empty />}
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
          dateOfBirth={customer?.date_of_birth?.split('T')[0].split('-').reverse().join('.') || '-'}
        />
      </DropdownModal>
      <tr className={styles.marginRow}></tr>
    </>
  );
};
