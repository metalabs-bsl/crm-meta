import { useState } from 'react';
import { StartTable } from '../StartTable';
import { IEmployeeInfo } from '../types/IEmployee';
import { StartEndPeriodPicker } from './StartEndPeriodPicker';
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
    }
  ]
};

export const Personal = () => {
  const [startDate, setStartDate] = useState<string>('2024-06-01T00:00');
  const [endDate, setEndDate] = useState<string>('2024-06-30T00:00');

  return (
    <div className={styles.content}>
      <StartSummary />
      <StartEndPeriodPicker startValue={startDate} endValue={endDate} onChangeStart={setStartDate} onChangeEnd={setEndDate} />
      <StartTable employee={employee} />
    </div>
  );
};
