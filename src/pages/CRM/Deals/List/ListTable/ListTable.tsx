import { FC, useEffect, useState } from 'react';
import { DeleteModal } from 'common/components';
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
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const { role } = useAppSelector(employeesSelectors.employees);
  const isManagement = role === ROLES.SENIOR_MANAGER || role === ROLES.DIRECTOR;
  const [changedRows, setChangedRows] = useState<IChange[]>([]);

  console.log('changedRows', changedRows);

  useEffect(() => {
    if (data) {
      setTableData(data.leads);
    }
  }, [data]);

  const handleSelectRow = (id: string) => {
    setSelectedRows((prevSelected) => (prevSelected.includes(id) ? prevSelected.filter((rowId) => rowId !== id) : [...prevSelected, id]));
  };

  // const handleEdit = () => {
  //   setIsEditing(true);
  // };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setSelectedRows([]);
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  // const handleSave = () => {
  //   setIsEditing(false);
  //   setSelectedRows([]);
  // };

  // const handleCancel = () => {
  //   setIsEditing(false);
  //   setSelectedRows([]);
  // };

  const handleChange = (data: IChange) => {
    console.log(data);

    setChangedRows((prev) => {
      if (prev.length) {
        const updatedDatas = prev.map((item) => {
          if (item.id === data.id) {
            return data;
          } else {
            return item;
          }
        });
        return updatedDatas;
      }
      return [...prev, ...[data]];
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
            {isManagement && <th className={styles.table_titles}>ответственный</th>}
            <th className={styles.table_titles}>Действия</th>
          </tr>
        </thead>
        <tbody className={styles.table_body}>
          {tableData?.map((row) => (
            <TableRowData
              columns={[]}
              key={row.id}
              {...row}
              selectedRows={selectedRows}
              handleSelectRow={handleSelectRow}
              stages={data.stages}
              isEditing={isEditing}
              onRowChange={handleChange}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
      {/* {selectedRows.length > 0 && (
        <div className={styles.buttons}>
          {isEditing ? (
            <>
              <button onClick={handleSave} className={styles.btnSave}>
                Сохранить
              </button>
              <button onClick={handleCancel} className={styles.btnCancel}>
                Отменить
              </button>
            </>
          ) : (
            <>
              <button onClick={handleEdit} className={styles.btnEdit}>
                Редактировать
              </button>
              {isManagement && (
                <button onClick={handleDelete} className={styles.btnDelete}>
                  Удалить
                </button>
              )}
            </>
          )}
        </div>
      )} */}
      <DeleteModal
        text='Вы уверены, что хотите удалить выбранные элементы?'
        isOpen={showDeleteModal}
        onDelete={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ListTable;
