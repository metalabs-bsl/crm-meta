import { ChangeEvent, FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { DatePicker } from 'common/ui';
import styles from './styles.module.scss';

interface StartEndPeriodPickerProps {
  startValue: string;
  onChangeStart: (date: string) => void;
  endValue: string;
  onChangeEnd: (date: string) => void;
  className?: string;
}

export const StartEndPeriodPicker: FC<StartEndPeriodPickerProps> = ({ startValue, onChangeStart, endValue, onChangeEnd, className }) => {
  const [startDate, setStartDate] = useState<string>(startValue);
  const [endDate, setEndDate] = useState<string>(endValue);

  useEffect(() => {
    if (onChangeStart) {
      onChangeStart(startDate);
    }
  }, [startDate, onChangeStart]);

  useEffect(() => {
    if (onChangeEnd) {
      onChangeEnd(endDate);
    }
  }, [endDate, onChangeEnd]);

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    if (new Date(endDate) < new Date(newStartDate)) {
      setEndDate(newStartDate);
    }
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    if (new Date(newEndDate) >= new Date(startDate)) {
      setEndDate(newEndDate);
    } else {
      alert('End date cannot be earlier than start date');
    }
  };

  return (
    <div className={cn(styles.content, className)}>
      <span className={styles.title}>Отчетный период:</span>
      <span className={styles.preposition}>с</span>
      <DatePicker className={styles.date} value={startDate} onChange={handleStartDateChange} />
      <span className={styles.preposition}>по</span>
      <DatePicker className={styles.date} value={endDate} minDate={startDate} onChange={handleEndDateChange} />
    </div>
  );
};
