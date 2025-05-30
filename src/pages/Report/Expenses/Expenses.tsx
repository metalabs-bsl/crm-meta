import { FC, useEffect, useState } from 'react';
import { Button, StartEndPeriodPicker } from 'common/ui';
import api from 'api/admin/expenses/expenses.api';
import { IListItem, ITableData } from './types/ITableData';
import { addTotalToTableData, calculateTotalTableDataPrice } from './Expenses.helper';
import { ExpensesTable } from './ExpensesTable';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export const Expenses: FC = () => {
  const [startDate, setStartDate] = useState<string>('2024-06-01');
  const [endDate, setEndDate] = useState<string>('2024-06-30');

  const [addNew, setAddNew] = useState<boolean>(false);
  const [tableData, setTableData] = useState<ITableData[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const getCurrentMonthInBishkek = () => {
    const bishkekTime = new Intl.DateTimeFormat('ru-RU', {
      timeZone: 'Asia/Bishkek',
      month: 'long',
      year: 'numeric'
    }).format(new Date());
    return bishkekTime.charAt(0).toUpperCase() + bishkekTime.slice(1);
  };
  const [currentMonthTitle] = useState<string>(getCurrentMonthInBishkek());

  const fetchExpenses = async () => {
    try {
      const { data } = await api.get<BackendExpense[]>('/expenses');
      const transformed = transformBackendResponse(data);
      const initialized = addTotalToTableData(transformed);
      setTableData(initialized);
      setTotalPrice(calculateTotalTableDataPrice(initialized));
    } catch (error) {
      console.error('Ошибка при загрузке расходов:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    setTotalPrice(calculateTotalTableDataPrice(tableData));
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
  const grouped: Record<string, IListItem[]> = {};
  data.forEach((item) => {
    const date = item.expense_date.split('T')[0];
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push({
      id: item.id,
      name: item.title,
      quantity: item.expense_quantity,
      price: item.expense_price
    });
  });
  return Object.entries(grouped).map(([creationDate, list]) => ({ creationDate, list }));
};

type BackendExpense = {
  id: string;
  expense_date: string;
  title: string;
  expense_quantity: number;
  expense_price: number;
};
