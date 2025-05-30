import { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Loading, StartEndPeriodPicker } from 'common/ui';
import { useGetSummaryQuery } from 'api/admin/leads/endpoints/start';
import { useGetStartTableInfoQuery } from 'api/admin/start/start.api';
import { StartTable } from '../StartTable';
import { StartSummary } from './StartSummary';
import styles from './styles.module.scss';

export const Personal: FC = () => {
  const [startDate, setStartDate] = useState<string>(dayjs().startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState<string>(dayjs().endOf('month').format('YYYY-MM-DD'));

  const { data: summary, isFetching } = useGetSummaryQuery({ startDate, endDate });
  const { data: employee } = useGetStartTableInfoQuery({ date_from: startDate, date_to: endDate, type: 'my' });

  useEffect(() => {
    console.log(employee);
  }, []);

  return (
    <Loading isSpin={isFetching}>
      <div className={styles.content}>
        <StartSummary
          totalDeals={summary?.totalDeals}
          processedDeals={summary?.employeeProcessedDeals}
          soldDeals={summary?.employeeSoldDeals}
          conversion={summary?.bonusPercentage}
        />
        <StartEndPeriodPicker
          startValue={startDate}
          endValue={endDate}
          onChangeStart={setStartDate}
          onChangeEnd={setEndDate}
          className={styles.datePicker}
        />
        {
          //@ts-ignore
          <StartTable employee={employee} />
        }
      </div>
    </Loading>
  );
};
