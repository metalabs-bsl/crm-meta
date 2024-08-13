/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from 'react';
import { Checkbox, DatePicker, FilePicker, SearchInput, Select } from 'common/ui';
import { DeleteModal, Modal } from 'common/components';
import { dateFormat } from 'common/helpers';
import { useNotify } from 'common/hooks';
import { useDeleteEMployeeMutation, useGetAllEmployeesQuery, useUpdateEmployeeInfoMutation } from 'api/admin/employees/employees.api';
import { IEmployee } from 'types/entities/employees';
import AddEmployees from './AddEmployess/AddEmployess';
import { EditOptions, IEmployeeData } from './types/types';
import { columns } from './Employess.helper';
import styles from './style.module.scss';

const isEditOptions = (isEdit: any): isEdit is EditOptions => {
  return isEdit && typeof isEdit === 'object' && 'value' in isEdit;
};

export const Employees = () => {
  const { data } = useGetAllEmployeesQuery();
  console.log(data);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [tableData, setTableData] = useState<IEmployeeData[]>([]);
  const [, setIsMainChecked] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedData, setEditedData] = useState<{ [key: number | string]: Partial<IEmployeeData> }>({});
  const [agreementFile, setAgreementFile] = useState<File | null>(null);

  const [, setFrontPassport] = useState<File | null>(null);
  const [, setBackPassport] = useState<File | null>(null);
  // const [passportFiles, setPassportFiles] = useState<{ [key: number]: string[] }>({});
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState<boolean>(false);
  const [, setBirthdayData] = useState<{ [key: number]: Date | null }>({});
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [employeeIdToDelete, setEmployeeIdToDelete] = useState<string | null>(null);
  const notify = useNotify();

  const [deleteEmployee] = useDeleteEMployeeMutation();
  const [updateEmployeeInfo] = useUpdateEmployeeInfoMutation();

  const handleSearchValueChange = (text: string) => {
    setSearchTerm(text);
  };

  const filterData = (data: IEmployeeData[], term: string): IEmployeeData[] => {
    if (!term) return data;

    return data.filter((item) => {
      const fullName = `${item.first_name} `.toLowerCase();
      const jobTitle = `${item.job_title}`.toLowerCase();
      return fullName.includes(term.toLowerCase()) || jobTitle.includes(term.toLowerCase());
    });
  };

  const filteredData = useMemo(() => filterData(tableData, searchTerm), [tableData, searchTerm]);

  const transformData = (data: IEmployee[]): IEmployeeData[] => {
    return data.map((item) => ({
      id: item.id.toString(),
      fullName: `${item.first_name} ${item.second_name} ${item.middle_name}`,
      birthday: dateFormat(item.date_of_birth),
      phoneNumber: item.phone,
      job_title: item.job_title,
      email: item.email,
      startDateInternship: dateFormat(item.start_of_internship),
      startDateWork: dateFormat(item.start_of_work),
      agreement: item.contracts || [],
      passportBack: item.passportBack || [],
      created_at: item.created_at,
      date_of_birth: item.date_of_birth,
      first_name: item.first_name,
      phone: item.phone,
      second_name: item.second_name,
      start_of_internship: dateFormat(item.start_of_internship),
      contracts: item.contracts || [],
      passports: item.passportBack || [],
      passportFront: item.passportFront || [],
      background: item.background,
      email_password: item.email_password,
      end_of_internship: dateFormat(item.end_of_internship),
      login: item.login,
      middle_name: item.middle_name,
      password: item.password,
      refreshToken: item.refreshToken,
      roles: item.roles,
      start_of_work: dateFormat(item.start_of_work),
      status: item.status,
      updated_at: item.updated_at
    }));
  };

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
        setSelectedRows([]);
        setEmployeeIdToDelete(null);
        notify('Сотрудник успешно удален', 'success');
      } catch (error) {
        notify('Ошибка при удалении Сотрудника', 'error');
      }
    } else {
      console.error('Invalid employee ID:', employeeIdToDelete);
    }
  };

  useEffect(() => {
    if (data) {
      const transformedData = transformData(data);
      setTableData(transformedData);
    }
  }, [data]);

  const jobOptions = useMemo(() => {
    if (!data) return [];
    const jobs = data.map((employee) => employee.job_title);
    return Array.from(new Set(jobs)).map((job) => ({ label: job, value: job }));
  }, [data]);

  const handleMainCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsMainChecked(checked);
    if (checked) {
      setSelectedRows(tableData.map((_, index) => index));
    } else {
      setSelectedRows([]);
    }
  };

  const handleCheckboxChange = (index: number) => {
    setSelectedRows((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setEmployeeIdToDelete(null);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = async () => {
    try {
      const updatedEmployees: IEmployeeData[] = [];

      for (const index of selectedRows) {
        const updatedEmployee = { ...tableData[index], ...editedData[index] };

        const updatedData = {
          ...updatedEmployee,
          contracts: agreementFile ? [agreementFile.name] : updatedEmployee.contracts,

          // passports: frontPassport || backPassport || updatedEmployee.passportFront || updatedEmployee.passportBack,
          backPassport: updatedEmployee.passportBack,
          frontPassport: updatedEmployee.passportFront,
          id: tableData[index].id,
          job_title: updatedEmployee.job_title,
          date_of_birth: updatedEmployee.birthday,
          phone: updatedEmployee.phoneNumber,
          email: updatedEmployee.email,
          start_of_internship: updatedEmployee.startDateInternship,
          start_of_work: updatedEmployee.startDateWork
        };

        // Логирование обновленных данных
        console.log('Отправляемые данные:', updatedData);

        // Отправляем данные на сервер
        await updateEmployeeInfo(updatedData).unwrap();

        // Сохраняем обновленные данные
        updatedEmployees.push(updatedData);
      }

      // Обновляем состояние таблицы
      setTableData((prevTableData) =>
        prevTableData.map((item) => {
          const updatedItem = updatedEmployees.find((emp) => emp.id === item.id);
          return updatedItem ? updatedItem : item;
        })
      );

      // Очищаем состояния редактирования
      setIsEditing(false);
      notify('Изменения успешно сохранены', 'success');
    } catch (error) {
      console.error('Ошибка при сохранении изменений:', error);
      notify('Ошибка при сохранении изменений', 'error');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedRows([]);
    setEditedData({});
    setAgreementFile(null);
    setBackPassport(null);
    setFrontPassport(null);
    setBirthdayData({});
  };

  const handleInputChange = (index: number, key: string, value: any) => {
    setEditedData((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [key]: value
      }
    }));
  };

  // const handleAgreementFilesChange = (index: number, newFiles: string[]) => {
  //   console.log('Новые файлы договора:', newFiles);
  //   setAgreementFiles((prevFiles) => ({
  //     ...prevFiles,
  //     [index]: newFiles
  //   }));
  // };

  // const handlePassportFilesChange = (index: number, newFiles: string[]) => {
  //   console.log('Новые файлы паспорта:', newFiles);
  //   setPassportFiles((prevFiles) => ({
  //     ...prevFiles,
  //     [index]: newFiles
  //   }));
  // };

  // const handleFileChange = (index: number, field: string, files: string[]) => {
  //   if (field === 'agreements') {
  //     setAgreementFiles((prev) => ({
  //       ...prev,
  //       [index]: files
  //     }));
  //   } else if (field === 'passports') {
  //     setPassportFiles((prev) => ({
  //       ...prev,
  //       [index]: files
  //     }));
  //   }
  // };

  const handleDateChange = (index: number, key: keyof Partial<IEmployeeData>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditedData((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [key]: value
      }
    }));
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
        <div className={styles.searc_wrapper}>
          <SearchInput onValueChange={handleSearchValueChange} />
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

        <div className={styles.employeesContainer}>
          <table className={styles.employeesTable}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>
                  <div className={styles.main_checkbox}>
                    <Checkbox
                      checked={selectedRows.length === tableData.length && tableData.length > 0}
                      onChange={handleMainCheckboxChange}
                      disabled={tableData.length === 0}
                    />
                  </div>
                </th>
                {columns.map((column) => (
                  <th key={column.key} className={styles.titles_table}>
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={styles.table_body}>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className={styles.emptyTable}>
                    <h3 className={styles.search_text}>Совпадений не найдено</h3>
                  </td>
                </tr>
              ) : (
                filteredData.map((data, index) => (
                  <tr key={index}>
                    <td>
                      <div className={styles.checkbox}>
                        <Checkbox checked={selectedRows.includes(index)} onChange={() => handleCheckboxChange(index)} />
                      </div>
                    </td>
                    {columns.map((column) => (
                      <td key={column.key}>
                        {isEditing && selectedRows.includes(index) && column.isEdit ? (
                          isEditOptions(column.isEdit) && column.isEdit.component === 'input' ? (
                            <input
                              type='text'
                              value={editedData[index]?.[column.key] ?? data[column.key]}
                              onChange={(e) => handleInputChange(index, column.key, e.target.value)}
                              className={styles.editInput}
                            />
                          ) : isEditOptions(column.isEdit) && column.isEdit.component === 'select' ? (
                            <Select
                              options={jobOptions}
                              defaultValue={data[column.key as keyof IEmployeeData] ?? ''}
                              onChange={(e) => handleInputChange(index, column.key, e.target.value)}
                            />
                          ) : column.key === 'agreement' ? (
                            <FilePicker onChange={setAgreementFile} disabled={false} />
                          ) : column.key === 'passportFront' ? (
                            <th>
                              <FilePicker onChange={setFrontPassport} disabled={false} />
                            </th>
                          ) : column.key === 'passportBack' ? (
                            <th>
                              <FilePicker onChange={setBackPassport} disabled={false} />
                            </th>
                          ) : (
                            <DatePicker
                              defaultValue={
                                editedData[index]?.[column.key]
                                  ? new Date(editedData[index][column.key] as string).toISOString().slice(0, 10)
                                  : undefined
                              }
                              value={editedData[index]?.[column.key] ?? data[column.key]}
                              onChange={handleDateChange(index, column.key)}
                            />
                          )
                        ) : column.key === 'agreement' ? (
                          <div>
                            <a
                              href={`${process.env.REACT_APP_BASE_URL}${data.passportBack.path}`}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              {data.passportBack.original_name}
                            </a>
                          </div>
                        ) : column.key === 'passportFront' ? (
                          <>
                            <div>
                              <a
                                href={`${process.env.REACT_APP_BASE_URL}${data.passportFront.path}`}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                {data.passportFront.original_name}
                              </a>
                            </div>
                            <div>
                              <a
                                href={`${process.env.REACT_APP_BASE_URL}${data.passportBack.path}`}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                {data.passportBack.original_name}
                              </a>
                            </div>
                          </>
                        ) : column.key === 'passportBack' ? (
                          <>
                            <div>
                              <a
                                href={`${process.env.REACT_APP_BASE_URL}${data.passportFront.path}`}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                {data.passportFront.original_name}
                              </a>
                            </div>
                            <div>
                              <a
                                href={`${process.env.REACT_APP_BASE_URL}${data.passportBack.path}`}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                {data.passportBack.original_name}
                              </a>
                            </div>
                          </>
                        ) : (
                          data[column.key]
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className={styles.actionButtons}>
            {selectedRows.length > 0 && (
              <>
                {isEditing ? (
                  <>
                    <button className={styles.dtnEdit} onClick={handleSave}>
                      Сохранить
                    </button>
                    <button className={styles.btnDelete} onClick={handleCancelEdit}>
                      Отменить
                    </button>
                  </>
                ) : (
                  <>
                    <button className={styles.dtnEdit} onClick={handleEdit}>
                      Редактировать
                    </button>
                    <button className={styles.btnDelete} onClick={() => handleDeleteClick(filteredData[selectedRows[0]].id)}>
                      Удалить
                    </button>
                  </>
                )}
              </>
            )}
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
