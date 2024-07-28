/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Checkbox, DatePicker, SearchInput } from 'common/ui';
import { DeleteModal, Modal, MultipleFilePicker } from 'common/components';
import { dateFormat } from 'common/helpers';
import { useGetAllEmployeesQuery } from 'api/admin/employees/employees.api';
import AddEmployees from './AddEmployees/AddEmployees';
import { EditOptions, IEmployeeData } from './types/types';
import { columns } from './Employees.helper';
import styles from './style.module.scss';

const isEditOptions = (isEdit: any): isEdit is EditOptions => {
  return isEdit && typeof isEdit === 'object' && 'value' in isEdit;
};

export const Employees = () => {
  const { data, isFetching: isGetAllEmployeesFetching } = useGetAllEmployeesQuery();
  console.log(data, isGetAllEmployeesFetching);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [, setIsMainChecked] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedData, setEditedData] = useState<{ [key: number]: Partial<IEmployeeData> }>({});
  const [agreementFiles, setAgreementFiles] = useState<{ [key: number]: string[] }>({});
  const [passportFiles, setPassportFiles] = useState<{ [key: number]: string[] }>({});
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState<boolean>(false);
  const [, setBirthdayData] = useState<{ [key: number]: Date | null }>({});
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchValueChange = (text: string) => {
    setSearchTerm(text);
  };

  const filterData = (data: DataColumn[], term: string): DataColumn[] => {
    if (!term) return data;

    return data.filter((item) => {
      const fullName = `${item.fullName}`.toLowerCase();
      const jobTitle = `${item.job_title}`.toLowerCase();
      return fullName.includes(term.toLowerCase()) || jobTitle.includes(term.toLowerCase());
    });
  };

  const filteredData = useMemo(() => filterData(tableData, searchTerm), [tableData, searchTerm]);

  const transformData = (data: IEmployee[]): DataColumn[] => {
    return data.map((item) => ({
      id: item.id,
      fullName: `${item.first_name} ${item.second_name}`,
      birthday: dateFormat(item.date_of_birth),
      phoneNumber: item.phone,
      job_title: item.job_title,
      email: item.email,
      startDateInternship: item.start_of_internship,
      startDateWork: dateFormat(item.created_at),
      agreement: item.contract && Array.isArray(item.contract) ? item.contract.join(', ') : 'Нету файлов',
      passport: item.passport && Array.isArray(item.passport) ? item.passport.join(', ') : 'Нету файлов'
    }));
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
    if (checked && data) {
      setSelectedRows(data.map((_, index) => index));
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

  const handleDelete = () => {
    // setTableData((prev) => prev.filter((_, index) => !selectedRows.includes(index)));
    setShowDeleteModal(false);
    setSelectedRows([]);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // setTableData((prev) => prev.map((item: any, index: number) => (editedData[index] ? { ...item, ...editedData[index] } : item)));
    setIsEditing(false);
    setSelectedRows([]);
    console.log('Saved Data:', editedData);

    setEditedData({});
    setBirthdayData({});
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedRows([]);
    setEditedData({});
    setAgreementFiles({});
    setPassportFiles({});
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

  const handleAgreementFilesChange = (index: number, newFiles: string[]) => {
    try {
      console.log('Новые файлы договора:', newFiles);
      setAgreementFiles((prevFiles) => ({
        ...prevFiles,
        [index]: newFiles
      }));
    } catch (error) {
      console.error('Ошибка обработки файлов договора:', error);
    }
  };

  const handlePassportFilesChange = (index: number, newFiles: string[]) => {
    console.log('Новые файлы паспорта:', newFiles);
    setPassportFiles((prevFiles) => ({
      ...prevFiles,
      [index]: newFiles
    }));
  };

  const handleDateChange = (index: number, key: keyof Partial<DataColumn>) => (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <div>
          <SearchInput onValueChange={handleSearchValueChange} />
        </div>
      </div>
      <div className={styles.wrapper}>
        <Modal className={styles.modal} isOpen={showAddEmployeeForm} onClose={() => setShowAddEmployeeForm(false)}>
          <AddEmployees setShowAddEmployee={setShowAddEmployeeForm} />
        </Modal>

        <div className={styles.employeesContainer}>
          <table className={styles.employeesTable}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>
                  <div className={styles.main_checkbox}>
                    <Checkbox
                      checked={selectedRows.length === data?.length && data.length > 0}
                      onChange={handleMainCheckboxChange}
                      disabled={data?.length === 0}
                    />
                  </div>
                </th>
                {columns.map((column) => (
                  <th key={column.key}>{column.title}</th>
                ))}
              </tr>
            </thead>
            <tbody className={styles.table_body}>
              {data?.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className={styles.emptyTable}>
                    <h3 className={styles.search_text}> Совпадений не найдено</h3>
                  </td>
                </tr>
              ) : (
                data?.map((data, index) => (
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
                              defaultValue={data[column.key]}
                              onChange={(e) => handleInputChange(index, column.key, e.target.value)}
                            />
                          ) : column.key === 'agreement' ? (
                            <MultipleFilePicker
                              onFilesChange={(files: string[]) => handleAgreementFilesChange(index, files)}
                              files={agreementFiles[index] || []}
                              editable={false}
                            />
                          ) : column.key === 'passport' ? (
                            <MultipleFilePicker
                              onFilesChange={(files: string[]) => handlePassportFilesChange(index, files)}
                              files={passportFiles[index] || []}
                              editable={false}
                            />
                          ) : column.key === 'start_of_work' || column.key === 'start_of_internship' ? (
                            <DatePicker
                              defaultValue={editedData[index]?.[column.key] ? dateFormat(editedData[index][column.key]) : undefined}
                              onChange={handleDateChange(index, column.key)}
                            />
                          ) : column.key === 'date_of_birth' ? (
                            <DatePicker
                              defaultValue={
                                editedData[index]?.[column.key]
                                  ? new Date(editedData[index][column.key] as string).toISOString().slice(0, 10)
                                  : undefined
                              }
                              onChange={handleDateChange(index, column.key)}
                            />
                          ) : (
                            data[column.key]
                          )
                        ) : column.key === 'agreement' ? (
                          (agreementFiles[index] ?? data[column.key]?.split(','))?.map((file, fileIndex) => (
                            <div key={fileIndex}>
                              <a href={`/${file}`} target='_blank' rel='noopener noreferrer' className={styles.fileLink}>
                                {file || 'No file'}
                              </a>
                            </div>
                          ))
                        ) : column.key === 'passport' ? (
                          (passportFiles[index] ?? data[column.key]?.split(','))?.map((file, fileIndex) => (
                            <div key={fileIndex}>
                              <a href={`/${file}`} target='_blank' rel='noopener noreferrer' className={styles.fileLink}>
                                {file || 'No file'}
                              </a>
                            </div>
                          ))
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
                    <button className={styles.btnDelete} onClick={() => setShowDeleteModal(true)}>
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
        onDelete={handleDelete}
        onCancel={handleCancelDelete}
        text={'Вы уверены, что хотите удалить сотрудника?'}
      />
    </>
  );
};

export default Employees;
