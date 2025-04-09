import { FC } from 'react';
import { employeeRowHeaders } from '../Start.helper';
import { IEmployeeInfo } from '../types/IEmployee';
import { ContractsTable } from './ContractTable';
import styles from './styles.module.scss';

interface StartTableProps {
  employee: IEmployeeInfo;
}

export const StartTable: FC<StartTableProps> = ({ employee }) => {
  return (
    // Этот div нужен для того чтобы корректно работал border-radius на .content
    <div>
      <div className={styles.content}>
        <table className={styles.table}>
          <thead className={styles.head}>
            <tr>
              {employeeRowHeaders?.map((el, idx) => (
                <th className={styles.title} key={idx}>
                  {el}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.body}>
            <tr className={styles.row}>
              <td className={styles.item}>{employee?.name}</td>
              <td className={styles.item}>{employee?.bonuses}</td>
              <td className={styles.item}>{employee?.additionalBonuses}</td>
              <td className={styles.item}>{employee?.profit}</td>
              <td className={styles.item}>{employee?.applications}</td>
              <td className={styles.item}>{employee?.avgCheck}</td>
              <td className={styles.item}>{employee?.avgCommissionCheck}</td>
              <td className={styles.item}>{employee?.tourists}</td>
            </tr>
          </tbody>
        </table>
        <ContractsTable contracts={employee?.contracts} />
      </div>
    </div>
  );
};
