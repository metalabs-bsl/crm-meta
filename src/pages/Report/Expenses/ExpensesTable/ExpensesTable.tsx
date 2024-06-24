import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Button, DatePicker } from 'common/ui';
import { calculateTotalForNewItem, getCurrentDate } from '../Expenses.helper';
import { IListItem, ITableData } from '../types/ITableData';
import { ExpensesTableRow } from './ExpensesTableRow';
import { NewExpenseRow } from './NewExpenseRow';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

interface ExpensesTableProps {
  addNew: boolean;
  setAddNew: (arg0: boolean) => void;
  tableData: ITableData[];
  setTableData: Dispatch<SetStateAction<ITableData[]>>;
}

export const ExpensesTable: FC<ExpensesTableProps> = ({ addNew, setAddNew, tableData, setTableData }) => {
  const [newExpenseData, setNewExpenseData] = useState<ITableData>({
    creationDate: getCurrentDate(),
    list: [
      {
        name: '',
        quantity: 0,
        price: 0
      }
    ],
    total: 0
  });

  const handleInputChange = (index: number, field: keyof IListItem, value: string | number) => {
    const updatedList = newExpenseData.list.map((item, idx) => (idx === index ? { ...item, [field]: value } : item));
    const updatedTotal = calculateTotalForNewItem(updatedList);
    setNewExpenseData({ ...newExpenseData, list: updatedList, total: updatedTotal });
  };

  const addNewRow = () => {
    setNewExpenseData({
      ...newExpenseData,
      list: [...newExpenseData.list, { name: '', quantity: 0, price: 0 }]
    });
  };

  const addNewExpense = () => {
    setTableData((prev) => [newExpenseData, ...prev]);
    setAddNew(false);
  };

  return (
    <div className={styles.table}>
      <ul className={styles.head}>
        <li className={`${styles.headBlocks} ${styles.data}`}>
          <p className={styles.headText}>Дата</p>
        </li>
        <li className={`${styles.headBlocks} ${styles.naming}`}>
          <p className={styles.headText}>Наименование</p>
        </li>
        <li className={`${styles.headBlocks} ${styles.quantity}`}>
          <p className={styles.headText}>Количество</p>
        </li>
        <li className={`${styles.headBlocks} ${styles.price}`}>
          <p className={styles.headText}>Стоимость</p>
        </li>
      </ul>
      {addNew && (
        <div className={styles.edit}>
          <div className={styles.editWrapper}>
            <div className={`${styles.editColumn} ${styles.editDate}`}>
              <DatePicker
                // disabled={isEditable}
                value={newExpenseData.creationDate}
                onChange={(e) =>
                  setNewExpenseData((prev) => {
                    return { ...prev, creationDate: e.target.value };
                  })
                }
              />
            </div>
            {newExpenseData.list.map((el, idx) => (
              <NewExpenseRow key={idx} item={el} onChange={(field, value) => handleInputChange(idx, field, value)} />
            ))}
          </div>
          <button className={styles.editAdd} onClick={addNewRow}>
            +
          </button>
          <div className={styles.btnWrapper}>
            <Button className={styles.editSave} styleType={BUTTON_TYPES.GREEN} text='Сохранить' onClick={addNewExpense} />
            <Button className={styles.editDelete} styleType={BUTTON_TYPES.LINK_GRAY} text='Отменить' onClick={() => setAddNew(false)} />
          </div>
        </div>
      )}

      <div className={styles.body}>
        {tableData.map((el, idx) => (
          <ExpensesTableRow {...el} key={idx} />
        ))}
      </div>
    </div>
  );
};
