import { FC, useEffect, useState } from 'react';
import { Button, StartEndPeriodPicker } from 'common/ui';
import { IListItem, ITableData } from './types/ITableData';
import { addTotalToTableData, calculateTotalTableDataPrice } from './Expenses.helper';
import { ExpensesTable } from './ExpensesTable';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export const Expenses: FC = () => {
  const [startDate, setStartDate] = useState<string>('2024-06-01T00:00');
  const [endDate, setEndDate] = useState<string>('2024-06-30T00:00');
  const [addNew, setAddNew] = useState<boolean>(false);
  const [tableData, setTableData] = useState<ITableData[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Get the current month and year in the Bishkek timezone
  const getCurrentMonthInBishkek = () => {
    const bishkekTime = new Intl.DateTimeFormat('ru-RU', {
      timeZone: 'Asia/Bishkek',
      month: 'long',
      year: 'numeric'
    }).format(new Date());
    return bishkekTime.charAt(0).toUpperCase() + bishkekTime.slice(1); // Capitalize month
  };

  const [currentMonthTitle] = useState<string>(getCurrentMonthInBishkek());

  const fetchExpenses = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_BASE_URL + '/expenses');
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      const data = await response.json();

      const transformedData = transformBackendResponse(data);
      const initializedData = addTotalToTableData(transformedData);
      setTableData(initializedData);

      const initialTotal = calculateTotalTableDataPrice(initializedData);
      setTotalPrice(initialTotal);
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    const total = calculateTotalTableDataPrice(tableData);
    setTotalPrice(total);
  }, [tableData]);

  return (
    <div className={styles.expenses}>
      <div>
        <div className={styles.heading}>
          <h1>Расходы</h1>
          <StartEndPeriodPicker startValue={startDate} endValue={endDate} onChangeStart={setStartDate} onChangeEnd={setEndDate} />
        </div>
        <div className={styles.body}>
          <div className={styles.bodyHeading}>
            <div>
              <span className={styles.allExpenses}>{`Расходы за ${currentMonthTitle}`}</span>
              <span className={styles.monthTotal}>{`${totalPrice} сом`}</span>
            </div>
            <div className={styles.btnWrapper}>
              <Button className={styles.greenBtn} styleType={BUTTON_TYPES.YELLOW} text='Добавить расход' onClick={() => setAddNew(true)} />
              <a className={styles.download} href='#' download>
                Выгрузить в PDF
              </a>
              <a className={styles.download} href='#' download>
                Выгрузить в Excel
              </a>
            </div>
          </div>
          <ExpensesTable
            addNew={addNew}
            setAddNew={setAddNew}
            tableData={tableData}
            setTableData={setTableData}
            fetchExpenses={fetchExpenses}
          />
        </div>
      </div>
    </div>
  );
};

const transformBackendResponse = (data: BackendExpense[]): ITableData[] => {
  const groupedData: Record<string, IListItem[]> = {};

  data.forEach((item) => {
    const date = item.expense_date.split('T')[0]; // Extract date part
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push({
      id: item.id,
      name: item.title,
      quantity: item.expense_quantity,
      price: item.expense_price
    });
  });

  return Object.entries(groupedData).map(([creationDate, list]) => ({
    creationDate,
    list
  }));
};

type BackendExpense = {
  id: string;
  expense_date: string;
  title: string;
  expense_quantity: number;
  expense_price: number;
};
