/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Checkbox, DatePicker, SearchInput } from 'common/ui';
import { DeleteModal, Modal, MultipleFilePicker } from 'common/components';
import AddEmployess from './AddEmployess/AddEmployess';
import { DataColumn, EditOptions } from './types/types';
import { columns, dataColumns } from './Employess.helper';
import styles from './style.module.scss';

const isEditOptions = (isEdit: any): isEdit is EditOptions => {
  return isEdit && typeof isEdit === 'object' && 'value' in isEdit;
};

export const Employees = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [tableData, setTableData] = useState<DataColumn[]>(dataColumns);
  const [, setIsMainChecked] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedData, setEditedData] = useState<{ [key: number]: Partial<DataColumn> }>({});
  const [agreementFiles, setAgreementFiles] = useState<{ [key: number]: string[] }>({});
  const [passportFiles, setPassportFiles] = useState<{ [key: number]: string[] }>({});
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState<boolean>(false);
  const [, setBirthdayData] = useState<{ [key: number]: Date | null }>({});

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

  const handleDelete = () => {
    setTableData((prev) => prev.filter((_, index) => !selectedRows.includes(index)));
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
    setTableData((prev) => prev.map((item: any, index: number) => (editedData[index] ? { ...item, ...editedData[index] } : item)));
    setIsEditing(false);
    setSelectedRows([]);
    console.log('Saved Data:', editedData);

    setEditedData({});
    // setAgreementFiles({});
    // setPassportFiles({});
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

  useEffect(() => {
    const initialAgreementFilesFromServer = dataColumns.reduce(
      (acc, item, index) => {
        if (item.agreement) {
          acc[index] = item.agreement.split(',');
        }
        return acc;
      },
      {} as { [key: number]: string[] }
    );

    const initialPassportFilesFromServer = dataColumns.reduce(
      (acc, item, index) => {
        if (item.passport) {
          acc[index] = item.passport.split(',');
        }
        return acc;
      },
      {} as { [key: number]: string[] }
    );

    setAgreementFiles(initialAgreementFilesFromServer);
    setPassportFiles(initialPassportFilesFromServer);
  }, []);

  return (
    <>
      <div className={styles.employeesHeader}>
        <div className={styles.btn_title}>
          <h2 className={styles.title}>Сотрудники</h2>
          <button className={styles.addEmployeeButton} onClick={() => setShowAddEmployeeForm(true)}>
            добавить сотрудника
          </button>
        </div>
        <div>
          <SearchInput />
        </div>
      </div>
      <div className={styles.wrapper}>
        <Modal isOpen={showAddEmployeeForm} onClose={() => setShowAddEmployeeForm(false)}>
          {showAddEmployeeForm && <AddEmployess />}
        </Modal>

        <div className={styles.employeesContainer}>
          <table className={styles.employeesTable}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.main_checkbox}>
                  <Checkbox
                    checked={selectedRows.length === tableData.length && tableData.length > 0}
                    onChange={handleMainCheckboxChange}
                    disabled={tableData.length === 0}
                  />
                </th>
                {columns.map((column) => (
                  <th key={column.key}>{column.title}</th>
                ))}
              </tr>
            </thead>
            <tbody className={styles.table_body}>
              {tableData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className={styles.emptyTable}>
                    <h3 className={styles.table_text}> Добавьте данные</h3>
                  </td>
                </tr>
              ) : (
                tableData.map((data, index) => (
                  <tr key={index}>
                    <td className={styles.checkbox}>
                      <Checkbox checked={selectedRows.includes(index)} onChange={() => handleCheckboxChange(index)} />
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
                            <select
                              value={editedData[index]?.[column.key] ?? data[column.key]}
                              onChange={(e) => handleInputChange(index, column.key, e.target.value)}
                              className={styles.editSelect}
                            >
                              <option value='Менеджер'>Менеджер</option>
                              <option value='Планктон'>Планктон</option>
                              <option value='Спанчбоб'>Спанчбоб</option>
                            </select>
                          ) : column.key === 'agreement' ? (
                            <MultipleFilePicker
                              files={agreementFiles[index] ?? []}
                              editable={false}
                              onFilesChange={(newFiles) => handleAgreementFilesChange(index, newFiles)}
                            />
                          ) : column.key === 'passport' ? (
                            <MultipleFilePicker
                              files={passportFiles[index] ?? []}
                              editable={false}
                              onFilesChange={(newFiles) => handlePassportFilesChange(index, newFiles)}
                            />
                          ) : column.key === 'startDateWork' || column.key === 'startDateInternship' ? (
                            <DatePicker
                              defaultValue={
                                editedData[index]?.[column.key]
                                  ? new Date(editedData[index][column.key] as string).toISOString().slice(0, 16)
                                  : undefined
                              }
                              onChange={handleDateChange(index, column.key)}
                            />
                          ) : column.key === 'birthday' ? (
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
                          (agreementFiles[index] ?? data[column.key].split(',')).map((file, fileIndex) => (
                            <div key={fileIndex}>
                              <a href={`/${file}`} target='_blank' rel='noopener noreferrer'>
                                {file || 'No file'}
                              </a>
                            </div>
                          ))
                        ) : column.key === 'passport' ? (
                          (passportFiles[index] ?? data[column.key].split(',')).map((file, fileIndex) => (
                            <div key={fileIndex}>
                              <a href={`/${file}`} target='_blank' rel='noopener noreferrer'>
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
        </div>

        <div>
          {selectedRows.length > 0 && !isEditing && (
            <div className={styles.actionButtons}>
              <button className={styles.dtnEdit} onClick={handleEdit}>
                Редактировать
              </button>
              <button className={styles.btnDelete} onClick={() => setShowDeleteModal(true)}>
                Удалить
              </button>
            </div>
          )}
          {isEditing && (
            <div className={styles.actionButtons}>
              <button className={styles.dtnEdit} onClick={handleSave}>
                Сохранить
              </button>
              <button className={styles.btnDelete} onClick={handleCancelEdit}>
                Отменить
              </button>
            </div>
          )}
        </div>
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        text='Вы уверены, что хотите удалить выбранные элементы?'
        onDelete={handleDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};
