import React from 'react';
import { Dayjs, locale } from 'dayjs';
import { Icon } from 'common/ui';
import 'dayjs/locale/ru';
import styles from './styles.module.scss';
locale('ru');

interface MonthSwitcherProps {
  currentMonth: Dayjs;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

export const MonthSwitcher: React.FC<MonthSwitcherProps> = ({ currentMonth, onPreviousMonth, onNextMonth }) => {
  const monthName = currentMonth.format('MMMM');
  const year = currentMonth.year();

  return (
    <div className={styles.swith_wrapper}>
      <Icon type='arrow-down' onClick={onPreviousMonth} className={styles.arrow} />
      <span className={styles.month_title}>
        <span className={styles.month}>{monthName}</span>
        <span>{year}</span>
      </span>
      <Icon type='arrow-up' onClick={onNextMonth} className={styles.arrow} />
    </div>
  );
};
