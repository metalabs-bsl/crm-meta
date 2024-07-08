import { FC, useEffect, useState } from 'react';
import { Checkbox } from 'common/ui';
import { DeleteModal } from 'common/components';
import { useAppSelector } from 'common/hooks';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import { ROLES } from 'types/roles';
import { ILeadRow, TableColumn, TableRow } from '../types/types';
import { TableRowData } from './TableRow/TableRow';
import styles from './style.module.scss';

interface TableProps {
  columns: TableColumn[];
  data: TableRow;
}

const ListTable: FC<TableProps> = ({ data }) => {
  const [tableData, setTableData] = useState<ILeadRow[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const { role } = useAppSelector(employeesSelectors.employees);
  const isManagement = role === ROLES.SENIOR_MANAGER;
  console.log(isManagement);

  useEffect(() => {
    if (data) {
      setTableData(data.leads);
    }
  }, [data]);

  const handleSelectRow = (id: string) => {
    setSelectedRows((prevSelected) => (prevSelected.includes(id) ? prevSelected.filter((rowId) => rowId !== id) : [...prevSelected, id]));
  };

  const handleSelectAllRows = () => {
    if (selectedRows.length === tableData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(tableData.map((row) => row.id));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

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

  const handleSave = () => {
    setIsEditing(false);
    setSelectedRows([]);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedRows([]);
  };

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.table_header}>
          <tr className={styles.table_header_titles}>
            <th>
              <div className={styles.main_checkbox}>
                <Checkbox
                  checked={selectedRows.length === tableData.length && tableData.length > 0}
                  onChange={handleSelectAllRows}
                  disabled={tableData.length === 0}
                />
              </div>
            </th>
            <th className={styles.table_titles}>наименование</th>
            <th className={styles.table_titles}>клиент</th>
            <th className={styles.table_titles}>стадия сделки</th>
            <th className={styles.table_titles}>дела</th>
            <th className={styles.table_titles}>сумма/валюта</th>
            {role !== ROLES.MANAGER && <th className={styles.table_titles}>ответственный</th>}
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
            />
          ))}
        </tbody>
      </table>
      {selectedRows.length > 0 && (
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
              <button onClick={handleDelete} className={styles.btnDelete}>
                Удалить
              </button>
            </>
          )}
        </div>
      )}
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
