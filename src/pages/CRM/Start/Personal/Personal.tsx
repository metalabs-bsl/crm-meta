import { FC, useState } from 'react';
import dayjs from 'dayjs';
import { Loading, StartEndPeriodPicker } from 'common/ui';
import { useGetSummaryQuery } from 'api/admin/leads/endpoints/start';
import { StartTable } from '../StartTable';
import { IEmployeeInfo } from '../types/IEmployee';
import { StartSummary } from './StartSummary';
import styles from './styles.module.scss';

const employee: IEmployeeInfo = {
  name: 'Кайбагаров Адилет',
  bonuses: '8%',
  additionalBonuses: '1.5%',
  profit: '2000$',
  applications: 100,
  avgCheck: '1500$',
  avgCommissionCheck: '1500$',
  tourists: 100,
  totalDeals: 20,
  processedDeals: 20,
  soldDeals: 15,
  conversion: '5%',
  contracts: [
    {
      contractNumber: 1234567890,
      brutto: '800.80$',
      netto: '800.80$',
      paid: '150$',
      profit: '30$',
      additionalBonuses: '10$',
      payer: 'Омуракунова Айгул',
      tourName: 'Жемчужина Ыссык-Кол',
      startDate: '22.07.2024',
      pax: 5,
      isPaid: false
    },
    {
      contractNumber: 1234567890,
      brutto: '800.80$',
      netto: '800.80$',
      paid: '150$',
      profit: '30$',
      additionalBonuses: '10$',
      payer: 'Омуракунова Айгул',
      tourName: 'Жемчужина Ыссык-Кол',
      startDate: '22.07.2024',
      pax: 5,
      isPaid: false
    }
  ]
};

export const Personal: FC = () => {
  const [startDate, setStartDate] = useState<string>(dayjs().startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState<string>(dayjs().endOf('month').format('YYYY-MM-DD'));

  const { data: summary, isFetching } = useGetSummaryQuery({ startDate, endDate });

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
        <StartTable employee={employee} />
      </div>
    </Loading>
  );
};
