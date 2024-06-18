import { useState } from 'react';
import { Icon } from 'common/ui';
import { ProfitTable } from './ProfitTable/ProfitTable';
import styles from './styles.module.scss';

const data = [
  {
    title: 'Курманбеков Марлен Сатарбекович',
    status: 'Руководитель-менеджер'
  },
  {
    title: 'Курманбеков Марлен Сатарбекович',
    status: 'Руководитель-менеджер'
  },
  {
    title: 'Курманбеков Марлен Сатарбекович',
    status: 'Руководитель-менеджер'
  },
  {
    title: 'Курманбеков Марлен Сатарбекович',
    status: 'Руководитель-менеджер'
  },
  {
    title: 'Курманбеков Марлен Сатарбекович',
    status: 'Руководитель-менеджер'
  },
  {
    title: 'Курманбеков Марлен Сатарбекович',
    status: 'Руководитель-менеджер'
  },
  {
    title: 'Курманбеков Марлен Сатарбекович',
    status: 'Руководитель-менеджер'
  },
  {
    title: 'Курманбеков Марлен Сатарбекович',
    status: 'Руководитель-менеджер'
  },
  {
    title: 'Курманбеков Марлен Сатарбекович',
    status: 'Руководитель-менеджер'
  }
];

export const Profit = () => {
  const [calendar, setCalendar] = useState(false);

  const handleClickCalendar = () => {
    setCalendar((prev) => !prev);
  };

  return (
    <div className={styles.profit}>
      <div className={styles.heading}>
        <h1>Прибыль</h1>
        <ul className={styles.calendarWrapper}>
          <li className={styles.calendarPeriod}>
            <span className={styles.periodText}>
              Отчетный период:
              <span className={styles.periodLetters}>с</span>
              <span className={styles.periodData}>10.10.10</span>
              <span className={styles.periodLetters}>по</span>
              <span className={styles.periodData}>10.10.10</span>
            </span>
          </li>
          <li className={styles.calendar}>
            <button onClick={handleClickCalendar} className={styles.calendarBtn}>
              Выбрать отчетный период
              <Icon type='black-border-calendar' />
            </button>
            <div className={`${styles.calendarContent} ${calendar ? styles.calendarContentActive : ''}`}>
              <div className={styles.calendarInner}>
                <span>Начало</span>
                <span className={styles.calendarData}>12.05.2024</span>
              </div>
              <div className={styles.calendarInner}>
                <span>Конец</span>
                <span className={styles.calendarData}>12.05.2024</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <ProfitTable data={data} />
    </div>
  );
};
