import { useEffect, useState } from 'react';
import { StartEndPeriodPicker } from 'pages/CRM/Start/Personal/StartEndPeriodPicker';
import { Button } from 'common/ui';
import { ITableData } from './types/ITableData';
import { addTotalToTableData, calculateTotalTableDataPrice } from './Expenses.helper';
import { ExpensesTable } from './ExpensesTable';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

const data = [
  {
    creationDate: '2024-06-03T00:00',
    list: [
      {
        name: 'Этажерка для мыломойки 1',
        quantity: 1,
        price: 600
      },
      {
        name: 'Алибеку на бензин 1',
        quantity: 1,
        price: 1500
      },
      {
        name: 'Салфетки влажные универсальные 1',
        quantity: 3,
        price: 400
      }
    ]
  },
  {
    creationDate: '2024-06-03T00:00',
    list: [
      {
        name: 'Этажерка для мыломойки',
        quantity: 1,
        price: 600
      },
      {
        name: 'Алибеку на бензин',
        quantity: 1,
        price: 1500
      },
      {
        name: 'Салфетки влажные универсальные',
        quantity: 3,
        price: 400
      }
    ]
  },
  {
    creationDate: '2024-06-03T00:00',
    list: [
      {
        name: 'Этажерка для мыломойки',
        quantity: 1,
        price: 600
      },
      {
        name: 'Алибеку на бензин',
        quantity: 1,
        price: 1500
      },
      {
        name: 'Салфетки влажные универсальные',
        quantity: 3,
        price: 400
      }
    ]
  },
  {
    creationDate: '2024-06-03T00:00',
    list: [
      {
        name: 'Этажерка для мыломойки',
        quantity: 1,
        price: 600
      },
      {
        name: 'Алибеку на бензин',
        quantity: 1,
        price: 1500
      },
      {
        name: 'Салфетки влажные универсальные',
        quantity: 3,
        price: 400
      }
    ]
  },
  {
    creationDate: '2024-06-03T00:00',
    list: [
      {
        name: 'Этажерка для мыломойки',
        quantity: 1,
        price: 600
      },
      {
        name: 'Алибеку на бензин',
        quantity: 1,
        price: 1500
      },
      {
        name: 'Салфетки влажные универсальные',
        quantity: 3,
        price: 400
      }
    ]
  }
];

export const Expenses = () => {
  const [startDate, setStartDate] = useState<string>('2024-06-01T00:00');
  const [endDate, setEndDate] = useState<string>('2024-06-30T00:00');
  const [addNew, setAddNew] = useState<boolean>(false);
  const [tableData, setTableData] = useState<ITableData[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  console.log(setTableData);

  useEffect(() => {
    const initializedData = addTotalToTableData(data);
    setTableData(initializedData);
    const initialTotal = calculateTotalTableDataPrice(initializedData);
    setTotalPrice(initialTotal);
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
              <span className={styles.allExpenses}>Расходы за июнь 2024</span>
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
          <ExpensesTable addNew={addNew} setAddNew={setAddNew} tableData={tableData} setTableData={setTableData} />
        </div>
      </div>
    </div>
  );
};
