import { FC } from 'react';
import cn from 'classnames';
import { contractRowHeaders } from '../../Start.helper';
import { IEmployeeContract } from '../../types/IEmployee';
import styles from './styles.module.scss';

interface ContractsTableProps {
  contracts: IEmployeeContract[];
}

export const ContractsTable: FC<ContractsTableProps> = ({ contracts }) => {
  return (
    <table className={styles.table}>
      <thead className={styles.head}>
        <tr>
          {contractRowHeaders.map((el, idx) => (
            <th className={styles.title} key={idx}>
              {el}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.body}>
        {contracts.map((contract, idx) => (
          <tr className={cn(styles.row, { [styles.row_paid]: contract.isPaid })} key={idx}>
            <td className={styles.item}>{contract.contractNumber}</td>
            <td className={styles.item}>{contract.brutto}</td>
            <td className={styles.item}>{contract.netto}</td>
            <td className={styles.item}>{contract.paid}</td>
            <td className={styles.item}>{contract.profit}</td>
            <td className={styles.item}>{contract.additionalBonuses}</td>
            <td className={styles.item}>{contract.payer}</td>
            <td className={styles.item}>{contract.tourName}</td>
            <td className={styles.item}>{contract.startDate}</td>
            <td className={styles.item}>{contract.pax}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
