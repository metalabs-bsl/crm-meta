import { FC, useCallback, useMemo } from 'react';
import cn from 'classnames';
import { Checkbox } from 'common/ui';
import { Accordion } from 'common/components';
import { PaymentRow, PaymentRowProps } from './PaymentRow';
import styles from './styles.module.scss';

type PaymentDetails = Omit<PaymentRowProps, 'accordionTitle'>;

interface TableRowProps {
  index: number;
  isSelected: boolean;
  onSelectRow: (index: number) => void;
  contractNumber: string;
  bookingNumber: string;
  gross: string;
  net: string;
  rate: string;
  commission: string;
  paymentMethod: string;
  destination: string;
  tourDates: string;
  tourOperator: string;
  tourInvoice: string;
  whoCreated: string;
  paymentDetails: PaymentDetails[];
}

const ordinalTitles = ['Первая оплата', 'Вторая оплата', 'Третья оплата', 'Четвертая оплата', 'Пятая оплата'];

export const TableRow: FC<TableRowProps> = ({
  index,
  isSelected,
  onSelectRow,
  contractNumber,
  bookingNumber,
  gross,
  net,
  rate,
  commission,
  paymentMethod,
  destination,
  tourDates,
  tourOperator,
  tourInvoice,
  whoCreated,
  paymentDetails
}) => {
  const allChecked = useMemo(() => paymentDetails.every((detail) => detail.isPaid), [paymentDetails]);

  const renderPaymentRowTitle = useCallback(
    (index: number, titles: string[]): string => {
      return paymentDetails.length === 1 ? 'Полная оплата' : titles[index];
    },
    [paymentDetails.length]
  );

  return (
    <>
      <tr className={cn(styles.mainRow, { [styles.checkedRow]: allChecked })}>
        <td className={styles.item}>
          <Checkbox checked={isSelected} onChange={() => onSelectRow(index)} />
        </td>
        <td className={styles.item}>{contractNumber}</td>
        <td className={styles.item}>{bookingNumber}</td>
        <td className={cn(styles.item, styles.paymentStatus)}>
          {allChecked ? (
            <span className={styles.paymentStatus_true}>Оплачено</span>
          ) : (
            <span className={styles.paymentStatus_false}>Не оплачено</span>
          )}
        </td>
        <td className={styles.item}>{gross}</td>
        <td className={styles.item}>{net}</td>
        <td className={styles.item}>{rate}</td>
        <td className={styles.item}>{commission}</td>
        <td className={styles.item}>{paymentMethod}</td>
        <td className={styles.item}>{destination}</td>
        <td className={styles.item}>{tourDates}</td>
        <td className={styles.item}>{tourOperator}</td>
        <td className={styles.item}>{tourInvoice}</td>
        <td className={styles.item}>{whoCreated}</td>
      </tr>
      <tr className={styles.accordionRow}>
        <td colSpan={14} className={styles.accordionContainer}>
          <Accordion className={styles.accordion} title='Информация об оплате'>
            <div className={styles.expandedContent}>
              {paymentDetails.map((detail, idx) => (
                <PaymentRow {...detail} key={idx} accordionTitle={renderPaymentRowTitle(idx, ordinalTitles)} />
              ))}
            </div>
          </Accordion>
        </td>
      </tr>
    </>
  );
};
