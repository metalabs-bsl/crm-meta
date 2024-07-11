import { FC, useEffect, useState } from 'react';
import { useAppSelector } from 'common/hooks';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import { ROLES } from 'types/roles';
import { ILeadRow, TableColumn, TableRow } from '../types/types';
import { TableRowData } from './TableRow';
import styles from './style.module.scss';

interface TableProps {
  columns: TableColumn[];
  data: TableRow;
}

interface IChange {
  id: string;
  lead_name: string;
  responsible_employee: string;
  currentStage: string;
}

const ListTable: FC<TableProps> = ({ data }) => {
  const [tableData, setTableData] = useState<ILeadRow[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isEditing] = useState<boolean>(false);
  const { role } = useAppSelector(employeesSelectors.employees);
  const isManagement = role === ROLES.MANAGER;
  const [, setChangedRows] = useState<IChange[]>([]);

  useEffect(() => {
    if (data) {
      setTableData(data.leads);
    }
  }, [data]);

  const handleSelectRow = (id: string) => {
    setSelectedRows((prevSelected) => (prevSelected.includes(id) ? prevSelected.filter((rowId) => rowId !== id) : [...prevSelected, id]));
  };

  const handleChange = (data: IChange) => {
    setChangedRows((prev) => {
      const updatedDatas = prev.map((item) => (item.id === data.id ? data : item));
      return updatedDatas.length > 0 ? updatedDatas : [...prev, data];
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.actions}></div>
      <table className={styles.table}>
        <thead className={styles.table_header}>
          <tr className={styles.table_header_titles}>
            <th className={styles.table_titles}>наименование</th>
            <th className={styles.table_titles}>клиент</th>
            <th className={styles.table_titles}>стадия сделки</th>
            <th className={styles.table_titles}>дела</th>
            <th className={styles.table_titles}>сумма/валюта</th>
            {!isManagement && <th className={styles.table_titles}>ответственный</th>}
            <th className={styles.table_titles}>Действия</th>
          </tr>
        </thead>
        <tbody className={styles.table_body}>
          {tableData?.map((row) => (
            <TableRowData
              handleDelete={function (): void {
                throw new Error('Function not implemented.');
              }}
              columns={[]}
              key={row.id}
              {...row}
              selectedRows={selectedRows}
              handleSelectRow={handleSelectRow}
              stages={data.stages}
              isEditing={isEditing}
              onRowChange={handleChange} // handleDelete={() => handleDelete(row.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTable;
