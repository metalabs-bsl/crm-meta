import { FC, useEffect, useState } from 'react';
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
    if (onChangeStart || onChangeEnd) {
      onChangeStart(startDate);
      onChangeEnd(endDate);
    }
  }, [startDate, endDate, onChangeStart, onChangeEnd]);

  return (
    <div className={styles.content}>
      <span className={styles.title}>Отчетный период:</span>
      <span className={styles.preposition}>с</span>
      <DatePicker className={styles.date} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <span className={styles.preposition}>по</span>
      <DatePicker className={styles.date} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
    </div>
  );
};
