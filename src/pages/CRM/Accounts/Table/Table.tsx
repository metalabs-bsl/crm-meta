import { FC } from 'react';
import cn from 'classnames';
import { IAccountData } from 'types/entities/accounts';
import { mainRowHeaders } from '../Account.helper';
import { TableRow } from './TableRow';
import styles from './styles.module.scss';

interface ITableProps {
  data: IAccountData[];
}

export const Table: FC<ITableProps> = ({ data }) => {
  // const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // const handleSelectRow = useCallback((index: number) => {
  //   setSelectedRows((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  // }, []);

  console.log(data);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tableRow}>
            {mainRowHeaders.map((header, idx) => (
              <th key={idx} className={cn(header.classNames.map((el) => `${styles[el]}`).join(' '))}>
                {header.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <TableRow key={index} {...row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
