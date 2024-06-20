import { FC, useState } from 'react';
import { StartEndPeriodPicker } from 'pages/CRM/Start/Personal/StartEndPeriodPicker';
import { DownloadCard } from './DownloadCard';
import styles from './styles.module.scss';

const data = [
  {
    title: 'Отчет по расчету времени работы сотрудников',
    linkPDF: 'https://example.com/files/report.pdf',
    linkExcel: 'https://example.com/files/report.xlsx'
  },
  {
    title: 'Отчет в бухгалтерию',
    linkPDF: 'https://example.com/files/report.pdf',
    linkExcel: 'https://example.com/files/report.xlsx'
  }
];

export const Others: FC = () => {
  const [startDate, setStartDate] = useState<string>('2024-06-01T00:00');
  const [endDate, setEndDate] = useState<string>('2024-06-30T00:00');
  return (
    <div className={styles.content}>
      <div className={styles.headBlock}>
        <div className={styles.titleBlock}>
          <h1>Другие отчеты</h1>
        </div>
        <StartEndPeriodPicker startValue={startDate} endValue={endDate} onChangeStart={setStartDate} onChangeEnd={setEndDate} />
      </div>
      <div className={styles.bodyBlock}>
        {data.map((el, idx) => (
          <DownloadCard {...el} key={idx} />
        ))}
      </div>
    </div>
  );
};
