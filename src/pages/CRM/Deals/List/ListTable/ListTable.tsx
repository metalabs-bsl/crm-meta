import { FC, useEffect, useState } from 'react';
import { Empty } from 'common/ui';
import { useAppSelector } from 'common/hooks';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import { ROLES } from 'types/roles';
import { ILeadRow, TableRow } from '../types/types';
import { TableRowData } from './TableRow';
import styles from './style.module.scss';

interface TableProps {
  data: TableRow;
}

const ListTable: FC<TableProps> = ({ data }) => {
  const [tableData, setTableData] = useState<ILeadRow[]>([]);
  const { role } = useAppSelector(employeesSelectors.employees);
  const isManagement = role === ROLES.DIRECTOR || role === ROLES.SENIOR_MANAGER;

  useEffect(() => {
    if (data) {
      setTableData(data.leads);
    }
  }, [data]);

  return (
    <>
      {tableData.length ? (
        <div className={styles.wrapper}>
          <div className={styles.tableContainer}>
            <div className={styles.innerTableContainer}>
              <table className={styles.table}>
                <thead className={styles.table_header}>
                  <tr className={styles.table_header_titles}>
                    <th className={styles.table_titles}>наименование</th>
                    <th className={styles.table_titles}>клиент</th>
                    <th className={styles.table_titles}>стадия сделки</th>
                    <th className={styles.table_titles}>Комментарий или дело</th>
                    <th className={styles.table_titles}>сумма/валюта</th>
                    {role !== ROLES.MANAGER && <th className={styles.table_titles}>ответственный</th>}
                    {isManagement && <th className={styles.table_titles}>Удаление</th>}
                  </tr>
                </thead>
                <tbody className={styles.table_body}>
                  {tableData?.map((row) => <TableRowData key={row.id} {...row} stages={data.stages} />)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <Empty />
      )}
    </>
  );
};

export default ListTable;
