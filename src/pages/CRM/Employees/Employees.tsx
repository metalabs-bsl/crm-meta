import { useEffect, useState } from 'react';
import { SearchInput } from 'common/ui';
import { DeleteModal, Modal } from 'common/components';
import { useNotify } from 'common/hooks';
import { useDeleteEMployeeMutation, useGetAllEmployeesQuery } from 'api/admin/employees/employees.api';
import { IEmployeeData } from './types/types';
import { AddEmployees } from './AddEmployess';
import { columns } from './Employees.helper';
import { EmployeeTableRow } from './EmployeeTableRow';
import styles from './style.module.scss';

export const Employees = () => {
  const { data } = useGetAllEmployeesQuery();
  console.log(data);

  const [tableData, setTableData] = useState<IEmployeeData[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState<boolean>(false);
  const [employeeIdToDelete, setEmployeeIdToDelete] = useState<string | null>(null);
  const notify = useNotify();

  const [deleteEmployee] = useDeleteEMployeeMutation();

  const handleDeleteClick = (employeeId: string) => {
    console.log('Deleting employee with ID:', employeeId);
    setEmployeeIdToDelete(employeeId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (employeeIdToDelete !== null) {
      try {
        await deleteEmployee(employeeIdToDelete).unwrap();
        setTableData((prev) => prev.filter((employee) => employee.id !== employeeIdToDelete));
        setShowDeleteModal(false);
        setEmployeeIdToDelete(null);
        notify('Сотрудник успешно удален', 'success');
      } catch (error) {
        notify('Ошибка при удалении Сотрудника', 'error');
      }
    } else {
      console.error('Invalid employee ID:', employeeIdToDelete);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setEmployeeIdToDelete(null);
  };

  // const handleSave = async () => {
  //   console.log('save employee');
  // };

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);
  return (
    <>
      <div className={styles.employeesHeader}>
        <div className={styles.btn_title}>
          <h2 className={styles.title}>Сотрудники</h2>
          <button className={styles.addEmployeeButton} onClick={() => setShowAddEmployeeForm(true)}>
            Добавить сотрудника
          </button>
        </div>
        <div className={styles.search_wrapper}>
          <SearchInput />
        </div>
      </div>
      <div className={styles.wrapper}>
        <Modal isOpen={showAddEmployeeForm} onClose={() => setShowAddEmployeeForm(false)} className={styles.modal}>
          {showAddEmployeeForm && (
            <AddEmployees
              setShowAddEmployee={function (): void {
                throw new Error('Function not implemented.');
              }}
            />
          )}
        </Modal>

        <div className={styles.tableContainer}>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {columns.map((title) => (
                <div key={title} className={styles.headerItem}>
                  {title}
                </div>
              ))}
            </div>
            {tableData.map((employee) => (
              <EmployeeTableRow {...employee} key={employee.id} handleDelete={handleDeleteClick} />
            ))}
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        onDelete={handleConfirmDelete}
        onCancel={handleCancelDelete}
        text={'Вы уверены, что хотите удалить сотрудника?'}
      />
    </>
  );
};

export default Employees;
