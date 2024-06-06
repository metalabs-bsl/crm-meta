import { FC } from 'react';
import { Accordion } from 'common/components';
import styles from './styles.module.scss';

interface TableRowProps {
  contractNumber: string;
  bookingNumber: string;
  paymentStatus: string;
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
  paymentDetails: {
    paymentDate: string;
    invoice: string;
    amount: string;
    method: string;
    receipt: string;
    tourAmount: string;
    employeeInvoice: string;
  }[];
}

export const TableRow: FC<TableRowProps> = ({
  contractNumber,
  bookingNumber,
  paymentStatus,
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
  return (
    <>
      <tr className={styles.mainRow}>
        <td>{contractNumber}</td>
        <td>{bookingNumber}</td>
        <td className={styles.paymentStatus}>{paymentStatus}</td>
        <td>{gross}</td>
        <td>{net}</td>
        <td>{rate}</td>
        <td>{commission}</td>
        <td>{paymentMethod}</td>
        <td>{destination}</td>
        <td>{tourDates}</td>
        <td>{tourOperator}</td>
        <td>{tourInvoice}</td>
        <td>{whoCreated}</td>
      </tr>
      <tr className={styles.accordionRow}>
        <td colSpan={13} className={styles.accordionContainer}>
          <Accordion className={styles.accordion}>
            <div className={styles.expandedContent}>
              {paymentDetails.map((detail, index) => (
                <Accordion title='Первая оплата' key={index}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>срок оплаты</th>
                        <th>счёт от ТО</th>
                        <th>сумма оплаты</th>
                        <th>способ оплаты</th>
                        <th>квитанция от ТО</th>
                        <th>оплата ТО</th>
                        <th>счёт от сотрудника</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{detail.paymentDate}</th>
                        <th>{detail.invoice}</th>
                        <th>{detail.amount}</th>
                        <th>{detail.method}</th>
                        <th>{detail.receipt}</th>
                        <th>{detail.tourAmount}</th>
                        <th>{detail.employeeInvoice}</th>
                        <th>галочка</th>
                      </tr>
                    </tbody>
                  </table>
                </Accordion>
              ))}
            </div>
          </Accordion>
        </td>
      </tr>
    </>
  );
};
