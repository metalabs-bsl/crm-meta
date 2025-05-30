import { FC, useState } from 'react';
import dayjs from 'dayjs';
import { StartEndPeriodPicker } from 'common/ui';
import { useGetStartTableInfoQuery } from 'api/admin/start/start.api';
import { StartTable } from '../StartTable';
import styles from './styles.module.scss';

export const General: FC = () => {
  const [startDate, setStartDate] = useState<string>(dayjs().startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState<string>(dayjs().endOf('month').format('YYYY-MM-DD'));
  const { data: employees } = useGetStartTableInfoQuery({ date_from: startDate, date_to: endDate, type: 'all' });

  return (
    <div className={styles.content}>
      <StartEndPeriodPicker
        startValue={startDate}
        endValue={endDate}
        onChangeStart={setStartDate}
        onChangeEnd={setEndDate}
        className={styles.datePicker}
      />
      {//@ts-ignore
      employees?.map((employee, index) => (
        //@ts-ignore
        <StartTable key={index} employee={employee} />
      ))}
    </div>
  );
};
