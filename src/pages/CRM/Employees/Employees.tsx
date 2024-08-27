import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Loading, SearchInput } from 'common/ui';
import { DeleteModal, Modal } from 'common/components';
import { useNotify, useSearch } from 'common/hooks';
import { useDeleteEmployeeMutation, useGetAllEmployeesQuery } from 'api/admin/employees/employees.api';
import { IEmployee } from 'types/entities';
import { AddEmployees } from './AddEmployess';
import { columns } from './Employees.helper';
import { EmployeeTableRow } from './EmployeeTableRow';
import styles from './style.module.scss';

export const Employees = () => {
  const { data: tableData = [], isFetching } = useGetAllEmployeesQuery();
  const [deleteEmployee, { isLoading }] = useDeleteEmployeeMutation();
  const [searchText, setSearchText] = useState<string>('');
  const filteredData = useSearch<IEmployee>(tableData, searchText);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState<boolean>(false);
  const [employeeIdToDelete, setEmployeeIdToDelete] = useState<string | null>(null);
  const [employeeFioToDelete, setEmployeeFioToDelete] = useState<string | null>(null);
  const notify = useNotify();
  const [isScrolled, setIsScrolled] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tableContainer = tableContainerRef.current;
    if (tableContainer) {
      const handleScroll = () => {
        setIsScrolled(tableContainer.scrollLeft > 0);
      };
      tableContainer.addEventListener('scroll', handleScroll);
      return () => tableContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleDeleteClick = (employeeId: string, fio: string) => {
    setEmployeeIdToDelete(employeeId);
    setEmployeeFioToDelete(fio);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (employeeIdToDelete !== null) {
      try {
        await deleteEmployee(employeeIdToDelete).unwrap();
        notify('Сотрудник успешно удален', 'success');
      } catch (error) {
        notify('Ошибка при удалении сотрудника', 'error');
      } finally {
        setShowDeleteModal(false);
        setEmployeeIdToDelete(null);
        setEmployeeFioToDelete(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setEmployeeIdToDelete(null);
    setEmployeeFioToDelete(null);
  };

  return (
    <Loading isSpin={isFetching || isLoading}>
      <div className={styles.employeesHeader}>
        <div className={styles.btn_title}>
          <h2 className={styles.title}>Сотрудники</h2>
          <button className={styles.addEmployeeButton} onClick={() => setShowAddEmployeeForm(true)}>
            Добавить сотрудника
          </button>
        </div>
        <div className={styles.search_wrapper}>
          <SearchInput placeholder='Поиск' onValueChange={setSearchText} />
        </div>
      </div>
      <div className={styles.wrapper} ref={tableContainerRef}>
        <Modal isOpen={showAddEmployeeForm} onClose={() => setShowAddEmployeeForm(false)} className={styles.modal}>
          {showAddEmployeeForm && <AddEmployees setShowAddEmployee={setShowAddEmployeeForm} />}
        </Modal>

        <div className={styles.tableContainer}>
          <div className={cn(styles.table, styles.tableHeaderWrapper)}>
            <div className={styles.tableHeader}>
              <div className={cn(styles.headerItem, { [styles.scrolled]: isScrolled })}>действия</div>
              {columns.map((title) => (
                <div key={title} className={styles.headerItem}>
                  {title}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.table}>
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
        text={`Вы уверены, что хотите удалить сотрудника: "${employeeFioToDelete}"?`}
      />
    </Loading>
  );
};

export default Employees;
