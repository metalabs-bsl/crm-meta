import { FC, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { Accordion, DropdownModal } from 'common/components';
import { IAccountData } from 'types/entities/accounts';
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
  const contractNumberRef = useRef(null);
  const [contractOpen, setContractOpen] = useState<boolean>(false);
  const allChecked = useMemo(() => paymentDetails.every((payment) => payment.isPaid), [paymentDetails]);

  return (
    <>
      <tr className={cn(styles.mainRow, { [styles.checkedRow]: allChecked })}>
        <td className={styles.item}>
          <span
            className={styles.contractNumber}
            onMouseEnter={() => setContractOpen(true)}
            onMouseLeave={() => setContractOpen(false)}
            ref={contractNumberRef}
          >
            {contractNumber || 'null'}
          </span>
        </td>
        <td className={styles.item}>{bookingNumber || 'null'}</td>
        <td className={cn(styles.item, styles.paymentStatus)}>
          <span
            className={cn({
              [styles.not_paid]: paymentStatus === 'Не оплачено',
              [styles.paid]: paymentStatus === 'Оплачено',
              [styles.partial]: paymentStatus === 'Частично'
            })}
          >
            {paymentStatus || 'null'}
          </span>
        </td>
        <td className={styles.item}>{gross || 'null'}</td>
        <td className={styles.item}>{net || 'null'}</td>
        <td className={styles.item}>{commission || 'null'}</td>
        <td className={styles.item}>{destination || 'null'}</td>
        <td className={styles.item}>{tourDates || 'null'}</td>
        <td className={styles.item}>{tourOperator || 'null'}</td>
        <td className={styles.item}>{tourInvoiceSom || 'null'}</td>
        <td className={styles.item}>{tourInvoiceUSD || 'null'}</td>
        <td className={styles.item}>{tourInvoiceEUR || 'null'}</td>
        <td className={styles.item}>{whoCreated || 'null'}</td>
      </tr>
      <tr className={styles.accordionRow}>
        <td colSpan={14} className={styles.accordionContainer}>
          <Accordion className={styles.accordion} title='Информация об оплате'>
            <div className={styles.expandedContent}>
              {paymentDetails.map((details) => (
                <PaymentRow {...details} key={details.id} />
              ))}
            </div>
          </Accordion>
        </td>
      </tr>
      <DropdownModal targetRef={contractNumberRef} isOpen={contractOpen} onClose={() => setContractOpen(false)}>
        <ContractModal
          name={customer?.fullname}
          phone={customer?.phone}
          city={customer?.city}
          source={customer?.source}
          dateOfBirth={customer?.date_of_birth}
        />
      </DropdownModal>
    </>
  );
};
