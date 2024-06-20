import { ChangeEvent, FC, useEffect, useState } from 'react';
import { DatePicker } from 'common/ui';
import styles from './styles.module.scss';

interface StartEndPeriodPickerProps {
  startValue: string;
  onChangeStart: (date: string) => void;
  endValue: string;
  onChangeEnd: (date: string) => void;
}

export const StartEndPeriodPicker: FC<StartEndPeriodPickerProps> = ({ startValue, onChangeStart, endValue, onChangeEnd }) => {
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
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  return (
    <div className={styles.content}>
      <span className={styles.title}>Отчетный период:</span>
      <span className={styles.preposition}>с</span>
      <DatePicker className={styles.date} value={startDate} onChange={handleStartDateChange} />
      <span className={styles.preposition}>по</span>
      <DatePicker className={styles.date} value={endDate} onChange={handleEndDateChange} />
    </div>
  );
};
