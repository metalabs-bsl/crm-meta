import { useEffect, useState } from 'react';
import cn from 'classnames';
import { SearchInput } from 'common/ui';
import { DeleteModal, Modal } from 'common/components';
import { useNotify, useSearch } from 'common/hooks';
import { useDeleteEMployeeMutation, useGetAllEmployeesQuery } from 'api/admin/employees/employees.api';
import { IEmployeeData } from './types/types';
import { AddEmployees } from './AddEmployess';
import { columns } from './Employees.helper';
import { EmployeeTableRow } from './EmployeeTableRow';
import styles from './style.module.scss';

export const Employees = () => {
  const { data: tableData = [] } = useGetAllEmployeesQuery();
  const [searchText, setSearchText] = useState<string>('');
  const filteredData = useSearch<IEmployeeData>(tableData, searchText);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState<boolean>(false);
  const [employeeIdToDelete, setEmployeeIdToDelete] = useState<string | null>(null);
  const notify = useNotify();
  const [deleteEmployee] = useDeleteEMployeeMutation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const tableContainer = document.querySelector(`.${styles.tableContainer}`);

    if (tableContainer) {
      const handleScroll = () => {
        setIsScrolled(tableContainer.scrollLeft > 0);
      };

      tableContainer.addEventListener('scroll', handleScroll);

      return () => {
        tableContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const handleDeleteClick = (employeeId: string) => {
    setEmployeeIdToDelete(employeeId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (employeeIdToDelete !== null) {
      try {
        await deleteEmployee(employeeIdToDelete).unwrap();
        notify('Сотрудник успешно удален', 'success');
        setShowDeleteModal(false);
        setEmployeeIdToDelete(null);
      } catch (error) {
        notify('Ошибка при удалении сотрудника', 'error');
      }
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setEmployeeIdToDelete(null);
  };

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
          <SearchInput onValueChange={setSearchText} />
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
              <div className={cn(styles.headerItem, { [styles.scrolled]: isScrolled })}>действия</div>
              {columns.map((title) => (
                <div key={title} className={styles.headerItem}>
                  {title}
                </div>
              ))}
            </div>
            {filteredData.map((employee) => (
              <EmployeeTableRow {...employee} key={employee.id} handleDelete={handleDeleteClick} isScrolled={isScrolled} />
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
