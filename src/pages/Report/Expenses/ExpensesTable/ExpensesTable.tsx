import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react';
import { Button, Icon } from 'common/ui';
import { calculateTotalForNewItem } from '../Expenses.helper';
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
  fetchExpenses: () => Promise<void>;
}

export const getCurrentDateInBishkek = (): string => {
  const bishkekTime = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Bishkek',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date());
  return bishkekTime; // Format: YYYY-MM-DD
};

export const ExpensesTable: FC<ExpensesTableProps> = ({ addNew, setAddNew, tableData, setTableData, fetchExpenses }) => {
  const [newExpenseData, setNewExpenseData] = useState<ITableData>({
    creationDate: getCurrentDateInBishkek(), // Customized to Bishkek time
    list: [
      {
        id: '1',
        name: '',
        quantity: 0,
        price: 0
      }
    ],
    total: 0
  });

  const sortedTableData = useMemo(() => {
    // Sort table data by creationDate in descending order
    return [...tableData].sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
  }, [tableData]);

  const handleInputChange = (index: number, field: keyof IListItem, value: string | number) => {
    const updatedList = newExpenseData.list.map((item, idx) => (idx === index ? { ...item, [field]: value } : item));
    const updatedTotal = calculateTotalForNewItem(updatedList);
    setNewExpenseData({ ...newExpenseData, list: updatedList, total: updatedTotal });
  };

  const addNewRow = () => {
    setNewExpenseData({
      ...newExpenseData,
      list: [...newExpenseData.list, { id: '', name: '', quantity: 0, price: 0 }]
    });
  };

  const addNewExpense = async () => {
    try {
      // Prepare the data for the backend
      const expensePayload = newExpenseData.list.map((item) => ({
        expense_date: newExpenseData.creationDate, // Only the date part
        title: item.name,
        expense_quantity: item.quantity,
        expense_price: item.price
      }));

      // Post to the backend
      const response = await fetch('http://localhost:8087/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(expensePayload)
      });

      if (!response.ok) {
        throw new Error(`Failed to save expense: ${response.statusText}`);
      }

      // Update table data
      setTableData((prev) => [newExpenseData, ...prev]);
      setAddNew(false);

      fetchExpenses();
    } catch (error) {
      console.error('Error saving expense:', error);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8087/expenses/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`Failed to delete expense: ${response.statusText}`);
      }
      await fetchExpenses(); // Refetch expenses after deletion
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
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
        <li className={`${styles.headBlocks} ${styles.delete}`}>
          <p className={styles.headText}></p>
        </li>
      </ul>
      {addNew && (
        <div className={styles.edit}>
          <div className={styles.editWrapper}>
            <div className={`${styles.editColumn} ${styles.editDate}`}>{newExpenseData.creationDate}</div>
            <div className={styles.inputsWrapper}>
              {newExpenseData.list.map((el, idx) => (
                <div className={styles.inputsInner} key={idx}>
                  <NewExpenseRow item={el} onChange={(field, value) => handleInputChange(idx, field, value)} />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.editAdd} onClick={addNewRow}>
            <Icon type='plus-icon' />
          </div>
          <div className={styles.btnWrapper}>
            <Button className={styles.editSave} styleType={BUTTON_TYPES.GREEN} text='Сохранить' onClick={addNewExpense} />
            <Button className={styles.editDelete} styleType={BUTTON_TYPES.LINK_GRAY} text='Отменить' onClick={() => setAddNew(false)} />
          </div>
        </div>
      )}

      <div className={styles.body}>
        {sortedTableData.map((el, idx) => (
          <ExpensesTableRow {...el} key={idx} expense={el} deleteExpense={deleteExpense} />
        ))}
      </div>
    </div>
  );
};
