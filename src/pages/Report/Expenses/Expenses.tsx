import { useState } from 'react';
import { StartEndPeriodPicker } from 'pages/CRM/Start/Personal/StartEndPeriodPicker';
import { Button } from 'common/ui';
import { ExpensesTable } from './ExpensesTable';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export const Expenses = () => {
  const [startDate, setStartDate] = useState<string>('2024-06-01T00:00');
  const [endDate, setEndDate] = useState<string>('2024-06-30T00:00');

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
              <span className={styles.monthTotal}>1234</span>
            </div>
            <div className={styles.btnWrapper}>
              <Button className={styles.greenBtn} styleType={BUTTON_TYPES.GREEN} text='Добавить расход' />
              <a className={styles.download} href='#' download>
                Выгрузить в Excel
              </a>
            </div>
          </div>
          <ExpensesTable />
        </div>
      </div>
    </div>
  );
};
