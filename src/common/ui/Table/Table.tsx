/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { DeleteModal } from 'common/components';
import { Checkbox } from '../Checkbox';
import MiniProgressBar, { Stage } from './MiniProgressBar';
import styles from './style.module.scss';

export interface TableColumn {
  key: string;
  title: string;
  isEdit?: {
    value: boolean;
    component: 'input' | 'select' | 'miniprogress';
  };
}

interface TableRow {
  [key: string]: any;
}

interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
}

const stages: Stage[] = [
  { title: 'Поступили', type: 'received', color: '#BBED21' },
  { title: 'Взят в обработку', type: 'processed', color: '#13EDFB' },
  { title: 'Рассмотрение', type: 'consideration', color: '#068D34' },
  { title: 'Бронирование', type: 'booking', color: '#C214DE' },
  { title: 'Завершить сделку', type: 'finish', color: '#F21212' }
];

export const Table: React.FC<TableProps> = ({ columns, data }) => {
  const [tableData, setTableData] = useState<TableRow[]>(data);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const handleCheckboxChange = (index: number) => {
    setSelectedRows((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  const handleInputChange = (rowIndex: number, columnKey: string, value: string) => {
    if (columnKey === 'dealStage') {
      // Обновляем статус сделки в таблице
      setTableData((prevData) =>
        prevData.map((row, index) =>
          index === rowIndex
            ? {
                ...row,
                [columnKey]: value, // Обновляем значение dealStage
                // Если dealStage изменяется, также нужно обновить значение текущей стадии
                currentStage: value
              }
            : row
        )
      );
    } else {
      setTableData((prevData) => prevData.map((row, index) => (index === rowIndex ? { ...row, [columnKey]: value } : row)));
    }
  };

  const handleSave = () => {
    console.log('Сохраненные данные:', tableData);
    setIsEditMode(false);
  };

  const handleDelete = () => {
    setTableData((prevData) => prevData.filter((_, index) => !selectedRows.includes(index)));
    setSelectedRows([]);
    setDeleteModalOpen(false);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setSelectedRows([]);
    setIsEditMode(false);
  };

  const renderEditComponent = (column: TableColumn, row: TableRow, rowIndex: number) => {
    const { key, isEdit } = column;
    if (!isEdit) {
      return row[key];
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      handleInputChange(rowIndex, key, e.target.value);
    };

    const handleStageClick = (stageType: string) => {
      setTableData((prevData) =>
        prevData.map((row, index) =>
          index === rowIndex
            ? {
                ...row,
                dealStage: stageType, // Обновление dealStage в соответствии с выбранной стадией прогресса
                currentStage: stageType // Обновление текущей стадии
              }
            : row
        )
      );
    };

    if (isEditMode && selectedRows.includes(rowIndex)) {
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
      } else if (isEdit.component === 'miniprogress') {
        return (
          <MiniProgressBar stages={stages} currentStage={row[key]} selectedStage={row['dealStage']} onStageClick={handleStageClick} />
          // <select value={row[key]} onChange={handleChange} className={styles.editInput}>
          //   {stages.map((stage) => (
          //     <option key={stage.type} value={stage.type}>
          //       {stage.title}
          //     </option>
          //   ))}
          // </select>
        );
      }
    } else if (isEdit.component === 'miniprogress') {
      return <MiniProgressBar stages={stages} currentStage={row[key]} selectedStage={row['dealStage']} />;
    }
    return row[key];
  };

  const getSelectOptions = (key: string) => {
    if (key === 'dealStage') {
      return stages.map((stage) => ({ value: stage.type, label: stage.title }));
    } else if (key === 'responsible') {
      return [
        { value: 'Almaz', label: 'Almaz' },
        { value: 'Иса', label: 'Иса' }
      ];
    }
    return [];
  };

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
        itemName={getSelectedRowNames()}
      />
    </div>
  );
};

export default Table;
