/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Checkbox, DatePicker, Icon, SearchInput } from 'common/ui';
import { DeleteModal, MultipleFilePicker } from 'common/components';
import { columns, dataColumns } from './List/List';
import { Column, DataColumn, EditOptions } from './types/types';
import styles from './style.module.scss';

interface EmployeesProps {
  columns: Column[];
  dataColumns: DataColumn[];
}

const isEditOptions = (isEdit: any): isEdit is EditOptions => {
  return isEdit && typeof isEdit === 'object' && 'value' in isEdit;
};

export const Employees: React.FC<EmployeesProps> = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isMainChecked, setIsMainChecked] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedData, setEditedData] = useState<{ [key: number]: Partial<DataColumn> }>({});
  const [files, setFiles] = useState<{ [key: number]: string[] }>({});
  const [showFilePicker, setShowFilePicker] = useState<{ [key: number]: boolean }>({});
  const [showPlusIcon, setShowPlusIcon] = useState<{ [key: number]: boolean }>({});

  const handleMainCheckboxChange = (e: any) => {
    const checked = e.target.checked;
    setIsMainChecked(checked);
    if (checked) {
      setSelectedRows(dataColumns.map((_, index) => index));
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
    setShowDeleteModal(false);
    setSelectedRows([]);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowPlusIcon(dataColumns.reduce((acc, _, index) => ({ ...acc, [index]: true }), {}));
  };

  const handleSave = () => {
    setIsEditing(false);
    setSelectedRows([]);
    console.log('Saved Data:', editedData);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedRows([]);
    setEditedData({});
    setShowPlusIcon({});
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

  const handleFilesChange = (index: number, newFiles: string[]) => {
    setFiles((prev) => ({
      ...prev,
      [index]: newFiles
    }));
    setShowFilePicker((prev) => ({
      ...prev,
      [index]: true
    }));
  };

  const handlePlusPicker = (index: number) => {
    setShowFilePicker((prev) => ({
      ...prev,
      [index]: true
    }));
    setShowPlusIcon((prev) => ({
      ...prev,
      [index]: false
    }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.employeesHeader}>
        <div className={styles.btn_title}>
          <h2 className={styles.title}>Сотрудники</h2>
          <button className={styles.addEmployeeButton}>добавить сотрудника</button>
        </div>
        <div>
          <SearchInput />
          {!isEditing && <Icon type='plus-gray' onClick={() => setShowFilePicker({ 0: true })} />}
        </div>
      </div>

      <div className={styles.employeesContainer}>
        <table className={styles.employeesTable}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.check}>
                <Checkbox checked={isMainChecked} onChange={handleMainCheckboxChange} />
              </th>
              {columns.map((column) => (
                <th key={column.key}>{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataColumns.map((data, index) => (
              <tr key={index}>
                <td>
                  <Checkbox
                    className={styles.checkbox}
                    checked={selectedRows.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
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
                        showPlusIcon[index] ? (
                          <Icon type='plus-gray' onClick={() => handlePlusPicker(index)} />
                        ) : (
                          showFilePicker[index] && (
                            <MultipleFilePicker
                              files={files[index] ?? data[column.key].split(',')}
                              editable={false}
                              onFilesChange={(newFiles) => handleFilesChange(index, newFiles)}
                            />
                          )
                        )
                      ) : column.key === 'startDateInternship' || column.key === 'startDateWork' ? (
                        <DatePicker onChange={(date) => handleInputChange(index, column.key, date)} />
                      ) : (
                        data[column.key]
                      )
                    ) : column.key === 'agreement' ? (
                      data[column.key].split(',').map((file, fileIndex) => (
                        <div key={fileIndex}>
                          <a href={`/${file}`} target='_blank' rel='noopener noreferrer'>
                            {file}
                          </a>
                        </div>
                      ))
                    ) : (
                      data[column.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {selectedRows.length > 0 && !isEditing && (
          <div className={styles.actionButtons}>
            <button onClick={handleEdit} className={styles.dtnEdit}>
              Редактировать
            </button>
            <button onClick={() => setShowDeleteModal(true)} className={styles.btnDelete}>
              Удалить
            </button>
          </div>
        )}
        {isEditing && (
          <div className={styles.actionButtons}>
            <button onClick={handleSave} className={styles.dtnEdit}>
              Сохранить
            </button>
            <button onClick={handleCancelEdit} className={styles.btnDelete}>
              Отменить
            </button>
          </div>
        )}
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        text='Вы уверены, что хотите удалить выбранные элементы?'
        onDelete={handleDelete}
        onCancel={handleCancelDelete}
      />

      {Object.keys(showFilePicker).map((index) =>
        showFilePicker[Number(index)] ? (
          <MultipleFilePicker
            key={index}
            files={files[Number(index)] ?? []}
            editable={true}
            onFilesChange={(newFiles) => handleFilesChange(Number(index), newFiles)}
          />
        ) : null
      )}
    </div>
  );
};
