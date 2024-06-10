/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { DeleteModal } from 'common/components';
import { Checkbox } from '../Checkbox';
import styles from './style.module.scss';

export interface TableColumn {
  key: string;
  title: string;
  isEdit?: {
    value: boolean;
    component: 'input' | 'select';
  };
}

interface TableRow {
  [key: string]: any;
}

interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
}

export const Table: React.FC<TableProps> = ({ columns, data }) => {
  const [tableData, setTableData] = useState<TableRow[]>(data);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  //Выбор строки
  //Добавляет или удаляет индекс строки из массива selectedRows.
  const handleCheckboxChange = (index: number) => {
    setSelectedRows((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  //Изменение значения ячейки
  //Обновляет значение ячейки в tableData.
  const handleInputChange = (rowIndex: number, columnKey: string, value: string) => {
    setTableData((prevData) => prevData.map((row, index) => (index === rowIndex ? { ...row, [columnKey]: value } : row)));
  };

  //Обновляет значение ячейки в tableData.
  const handleSave = () => {
    console.log('Saved data:', tableData);
    setIsEditMode(false);
  };

  //Удаляет выбранные строки из tableData.
  const handleDelete = () => {
    setTableData((prevData) => prevData.filter((_, index) => !selectedRows.includes(index)));
    setSelectedRows([]);
    setDeleteModalOpen(false);
  };

  //Включают и отменяют режим редактирования.
  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setSelectedRows([]);
    setIsEditMode(false);
  };

  //Возвращает компонент для редактирования ячейки, если соответствующая строка выбрана и включен режим редактирования.
  const renderEditComponent = (column: TableColumn, row: TableRow, rowIndex: number) => {
    const { key, isEdit } = column;
    if (!isEdit || !selectedRows.includes(rowIndex) || !isEditMode) return row[key];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      handleInputChange(rowIndex, key, e.target.value);
    };

    if (isEdit.component === 'input') {
      return <input type='text' value={row[key]} onChange={handleChange} className={styles.editInput} />;
    } else if (isEdit.component === 'select') {
      const options = getSelectOptions(key);
      return (
        <select value={row[key]} onChange={handleChange} className={styles.editInput}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }
    return row[key];
  };

  //Возвращает опции для компонента select в зависимости от ключа колонки.
  const getSelectOptions = (key: string) => {
    if (key === 'dealStage') {
      return [
        { value: 'Поступили', label: 'Поступили' },
        { value: 'Взят в обработку', label: 'Взят в обработку' },
        { value: 'Рассмотрение', label: 'Рассмотрение' },
        { value: 'Бронирование', label: 'Бронирование' },
        { value: 'Завершить сделку', label: 'Завершить сделку' }
      ];
    } else if (key === 'responsible') {
      return [
        { value: 'Almaz', label: 'Almaz' },
        { value: 'Иса', label: 'Иса' }
      ];
    }
    return [];
  };

  //Возвращает строку с именами выбранных строк для отображения в модальном окне удаления.
  const getSelectedRowNames = () => {
    return selectedRows.map((index) => tableData[index]?.name || `Запись ${index + 1}`).join(', ');
  };

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.table_wrapper}>
          <tr className={styles.table_titles}>
            <th>Выбрать</th>
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.table_body}>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td className={styles.checkbox}>
                <Checkbox checked={selectedRows.includes(index)} onChange={() => handleCheckboxChange(index)} />
              </td>
              {columns.map((column) => (
                <td key={column.key}>{renderEditComponent(column, row, index)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedRows.length > 0 && !isEditMode && (
        <div className={styles.buttons}>
          <button onClick={handleEdit} className={styles.btnEdit}>
            Редактировать
          </button>
          <button onClick={() => setDeleteModalOpen(true)} className={styles.btnDelete}>
            Удалить
          </button>
        </div>
      )}
      {isEditMode && (
        <div className={styles.buttons}>
          <button onClick={handleSave} className={styles.btnSave}>
            Сохранить
          </button>
          <button onClick={handleCancel} className={styles.btnCancel}>
            Отменить
          </button>
        </div>
      )}

      <DeleteModal
        isOpen={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onDelete={handleDelete}
        text={`Вы уверены, что хотите удалить следующие записи: `}
        itemName={getSelectedRowNames()} // Передача имен выбранных записей
      />
    </div>
  );
};

export default Table;
