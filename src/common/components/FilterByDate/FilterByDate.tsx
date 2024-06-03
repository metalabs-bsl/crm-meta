import { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from 'common/ui';
import styles from './styles.module.scss';

interface IProps {
  onFilterChange: (startDate: string, endDate: string) => void;
}

export const FilterByDate: FC<IProps> = ({ onFilterChange }) => {
  const currentDate = dayjs().format('YYYY-MM-DDTHH:mm');
  const [startDate, setStartDate] = useState<string>(currentDate);
  const [endDate, setEndDate] = useState<string>(currentDate);

  useEffect(() => {
    onFilterChange(startDate, endDate);
  }, [endDate, onFilterChange, startDate]);

  return (
    <div className={styles.filter}>
      <div className={styles.block}>
        <span>Начало</span>
        <DatePicker onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div className={styles.block}>
        <span>Конец</span>
        <DatePicker onChange={(e) => setEndDate(e.target.value)} />
      </div>
    </div>
  );
};
