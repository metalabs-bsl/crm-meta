/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from 'react';
import { CardDetail } from 'pages/CRM/Deals/CardDetail';
import { DeleteModal, EdgeModal, LossForm, Modal } from 'common/components';
import { Checkbox } from '../Checkbox';
import MiniProgressBar, { Stage } from './MiniProgressBar';
import styles from './style.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export interface TableColumn {
  key: string;
  title: string;
  isEdit?: {
    value: boolean;
    component: 'input' | 'select' | 'miniprogress' | 'date';
  };
  isClientInfo?: boolean;
}

type DealStage = 'received' | 'processed' | 'consideration' | 'booking' | 'finish' | 'sale' | 'loss';

export interface TableRow {
  [key: string]: any;
  dealStage: DealStage;
  date?: string;
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

  const onCloseModal = (modalName: keyof typeof modalState) => {
    setModalState({ ...modalState, [modalName]: false });
  };

  const handleSave = () => {
    console.log('Сохраненные данные:', tableData);
    setIsEditMode(false);
    setSelectedRows([]);
    onCloseModal('loss'); // Закрытие модального окна 'loss'
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
    } else if (stageType === 'sale') {
      if (tableData[rowIndex].dealStage !== 'sale') {
        setTableData((prevData) => prevData.map((row, index) => (index === rowIndex ? { ...row, dealStage: 'sale' } : row)));
      }
    } else {
      setTableData((prevData) => prevData.map((row, index) => (index === rowIndex ? { ...row, dealStage: stageType } : row)));
    }
  };

  const handleFinishAction = (finishType: 'sale' | 'loss') => {
    if (currentRowIndex !== null) {
      setTableData((prevData) =>
        prevData.map((row, index) => {
          if (index === currentRowIndex) {
            const updatedRow = { ...row };
            if (finishType === 'sale' && updatedRow.dealStage !== 'sale') {
              updatedRow.dealStage = 'finish';
            } else if (finishType === 'loss') {
              updatedRow.dealStage = 'loss';
              updatedRow.lossReason = lossReason;
            }
            return updatedRow;
          }
          return row;
        })
      );
      onCloseModal('finish'); // Закрытие модального окна 'finish'
      onCloseModal('loss'); // Закрытие модального окна 'loss'
      setCurrentRowIndex(null);
      setLossReason('');
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
      onCloseModal('loss'); // Закрытие модального окна 'loss'
      if (tableData[currentRowIndex].dealStage !== 'sale') {
        setTableData((prevData) => prevData.map((row, index) => (index === currentRowIndex ? { ...row, dealStage: 'finish' } : row)));
      }
      setCurrentRowIndex(null);
    }
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

  const handleCheckboxChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setSelectedRows((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  const handleInputChange = (rowIndex: number, columnKey: string, value: string) => {
    setTableData((prevData) => prevData.map((row, index) => (index === rowIndex ? { ...row, [columnKey]: value } : row)));
  };

  const handleSelectAllRows = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allRowsIndexes = tableData.map((_, index) => index);
      setSelectedRows(allRowsIndexes);
    } else {
      setSelectedRows([]);
    }
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
        onClose={() => onCloseModal('finish')}
        leftBtnText='Продажа'
        leftBtnStyle={BUTTON_TYPES.GREEN}
        leftBtnAction={() => {
          handleFinishAction('sale');
          onCloseModal('finish'); // Закрытие модального окна после нажатия на "Продажа"
        }}
        rightBtnText='Проигрыш'
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
        onClose={() => onCloseModal('loss')}
        leftBtnText='Сохранить'
        leftBtnStyle={BUTTON_TYPES.GREEN}
        leftBtnAction={() => handleLossFormChange(lossReason)}
        rightBtnText='Отменить'
        rightBtnStyle={BUTTON_TYPES.RED}
        rightBtnAction={() => onCloseModal('loss')}
      >
        <div className={styles.modalWrapper}>
          <LossForm onChangeValueType={setLossReason} onCancel={() => onCloseModal('loss')} />
        </div>
      </Modal>
    ),
    cardDetail: (
      <EdgeModal isOpen={modalState.cardDetail} onClose={() => onCloseModal('cardDetail')}>
        {selectedRow && <CardDetail cardTitle={selectedRow.name} />}
      </EdgeModal>
    )
  };

  const handleCancel = () => {
    setSelectedRows([]); // Сброс выбранных строк
    setIsEditMode(false); // Выход из режима редак
  };
  return (
    <>
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead className={styles.table_wrapper}>
            <tr className={styles.table_titles}>
              <div className={styles.main_checkbox}>
                <Checkbox checked={selectedRows.length === tableData.length} onChange={handleSelectAllRows} />
              </div>
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
              tableData.map((row, index) => (
                <tr key={index}>
                  <td className={styles.checkbox}>
                    <Checkbox checked={selectedRows.includes(index)} onChange={(e) => handleCheckboxChange(index, e)} />
                  </td>
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={styles.column}
                      onClick={() => column.key === 'name' && !isEditMode && handleNameClick(row)}
                    >
                      {renderEditComponent(column, row, index)}
                    </td>
                  ))}
                </tr>
              ))
            )}
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
            <button onClick={() => handleCancel()} className={styles.btnCancel}>
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
