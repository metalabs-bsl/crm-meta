/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from 'react';
import { CardDetail } from 'pages/CRM/Deals/CardDetail';
import { DeleteModal, LossForm, Modal } from 'common/components';
import { Checkbox } from '../Checkbox';
import MiniProgressBar, { Stage } from './MiniProgressBar';
import styles from './style.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export interface TableColumn {
  key: string;
  title: string;
  isEdit?: {
    value: boolean;
    component: 'input' | 'select' | 'miniprogress';
  };
}

type DealStage = 'received' | 'processed' | 'consideration' | 'booking' | 'finish' | 'sale' | 'loss';

export interface TableRow {
  [key: string]: any;
  dealStage: DealStage;
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

export const Table: FC<TableProps> = ({ columns, data }) => {
  const [tableData, setTableData] = useState<TableRow[]>(data);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [currentRowIndex, setCurrentRowIndex] = useState<number | null>(null);
  const [selectedRow, setSelectedRow] = useState<TableRow | null>(null);
  const [lossReason, setLossReason] = useState<string>('');

  const [modalState, setModalState] = useState({
    delete: false,
    finish: false,
    loss: false,
    cardDetail: false
  });

  const handleCheckboxChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setSelectedRows((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  const handleInputChange = (rowIndex: number, columnKey: string, value: string) => {
    setTableData((prevData) => prevData.map((row, index) => (index === rowIndex ? { ...row, [columnKey]: value } : row)));
  };

  const handleSave = () => {
    console.log('Сохраненные данные:', tableData);
    setIsEditMode(false);
  };

  const handleDelete = () => {
    setTableData((prevData) => prevData.filter((_, index) => !selectedRows.includes(index)));
    setSelectedRows([]);
    setModalState({ ...modalState, delete: false });
  };

  const handleStageClick = (stageType: DealStage, rowIndex: number) => {
    if (stageType === 'finish') {
      setModalState({ ...modalState, finish: true });
      setCurrentRowIndex(rowIndex);
    } else {
      setTableData((prevData) => prevData.map((row, index) => (index === rowIndex ? { ...row, dealStage: stageType } : row)));
    }
  };

  const handleNameClick = (row: TableRow) => {
    setSelectedRow(row);
    setModalState({ ...modalState, cardDetail: true });
  };

  const handleLossFormChange = (reason: string) => {
    if (currentRowIndex !== null) {
      setTableData((prevData) =>
        prevData.map((row, index) => (index === currentRowIndex ? { ...row, dealStage: 'loss', lossReason: reason } : row))
      );
      setModalState({ ...modalState, loss: false });
      setCurrentRowIndex(null);
    }
  };

  const getSelectOptions = (key: string) => {
    if (key === 'dealStage') {
      return stages.map((stage) => ({
        value: stage.type,
        label: stage.title
      }));
    } else if (key === 'responsible') {
      return [
        { value: 'Almaz', label: 'Almaz' },
        { value: 'Иса', label: 'Иса' }
      ];
    }
    return [];
  };

  const renderEditComponent = (column: TableColumn, row: TableRow, rowIndex: number) => {
    const { key, isEdit } = column;
    if (!isEdit) return row[key];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleInputChange(rowIndex, key, e.target.value);

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
          <MiniProgressBar
            stages={stages}
            currentStage={row[column.key]}
            selectedStage={row['dealStage']}
            onStageClick={(stageType) => handleStageClick(stageType, rowIndex)}
          />
        );
      }
    } else if (isEdit.component === 'miniprogress') {
      return <MiniProgressBar stages={stages} currentStage={row[column.key]} selectedStage={row['dealStage']} />;
    }

    return row[key];
  };

  const getSelectedRowNames = () => {
    return selectedRows.map((index) => tableData[index]?.name || `Запись ${index + 1}`).join(', ');
  };

  const modalComponents = {
    delete: (
      <DeleteModal
        isOpen={modalState.delete}
        onCancel={() => setModalState({ ...modalState, delete: false })}
        onDelete={handleDelete}
        text={`Вы уверены, что хотите удалить следующие записи: `}
        itemName={getSelectedRowNames()}
      />
    ),
    finish: (
      <Modal
        isOpen={modalState.finish}
        onClose={() => setModalState({ ...modalState, finish: false })}
        leftBtnText='продажа'
        leftBtnStyle={BUTTON_TYPES.GREEN}
        leftBtnAction={() => handleStageClick('sale', currentRowIndex!)}
        rightBtnText='проигрыш'
        rightBtnStyle={BUTTON_TYPES.RED}
        rightBtnAction={() => setModalState({ ...modalState, loss: true })}
      >
        <div className={styles.modalWrapper}>
          <p className={styles.modalWrapperText}>
            Выберите результат, <br /> с которым будет закрыта сделка.
          </p>
        </div>
      </Modal>
    ),
    loss: (
      <Modal
        isOpen={modalState.loss}
        onClose={() => setModalState({ ...modalState, loss: false })}
        leftBtnText='Сохранить'
        leftBtnStyle={BUTTON_TYPES.GREEN}
        leftBtnAction={() => handleLossFormChange(lossReason)}
        rightBtnText='Отменить'
        rightBtnStyle={BUTTON_TYPES.RED}
        // rightBtn
        rightBtnAction={() => setModalState({ ...modalState, loss: false })}
      >
        <div className={styles.modalWrapper}>
          <LossForm onChangeValueType={setLossReason} onCancel={() => setModalState({ ...modalState, loss: false })} />
        </div>
      </Modal>
    ),
    cardDetail: (
      <Modal
        isOpen={modalState.cardDetail}
        onClose={() => setModalState({ ...modalState, cardDetail: false })}
        leftBtnText='Закрыть'
        leftBtnStyle={BUTTON_TYPES.RED}
        leftBtnAction={() => setModalState({ ...modalState, cardDetail: false })}
        // className={styles.detailCardMOdal}
      >
        <div className={styles.detailCardMOdal}>{selectedRow && <CardDetail cardTitle={selectedRow.name} />}</div>
      </Modal>
    )
  };

  return (
    <>
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
                  <Checkbox checked={selectedRows.includes(index)} onChange={(e) => handleCheckboxChange(index, e)} />
                </td>
                {columns.map((column) => (
                  <td key={column.key} onClick={() => column.key === 'name' && !isEditMode && handleNameClick(row)}>
                    {renderEditComponent(column, row, index)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {selectedRows.length > 0 && !isEditMode && (
          <div className={styles.buttons}>
            <button onClick={() => setIsEditMode(true)} className={styles.btnEdit}>
              Редактировать
            </button>
            <button onClick={() => setModalState({ ...modalState, delete: true })} className={styles.btnDelete}>
              Удалить
            </button>
          </div>
        )}
        {selectedRows.length > 0 && isEditMode && (
          <div className={styles.buttons}>
            <button onClick={handleSave} className={styles.btnSave}>
              Сохранить
            </button>
            <button onClick={() => setIsEditMode(false)} className={styles.btnCancel}>
              Отменить
            </button>
          </div>
        )}
      </div>
      {modalComponents.delete}
      {modalComponents.finish}
      {modalComponents.loss}
      {modalComponents.cardDetail}
    </>
  );
};

export default Table;
