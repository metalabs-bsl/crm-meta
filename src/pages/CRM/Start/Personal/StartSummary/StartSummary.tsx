import { FC } from 'react';
import { getSummaryData } from '../../Start.helper';
import { SummaryItem } from './SummaryItem';
import styles from './styles.module.scss';

interface StartSummaryProps {
  totalDeals: number;
  processedDeals: number;
  soldDeals: number;
  conversion: string;
}

export const StartSummary: FC<StartSummaryProps> = ({ totalDeals, processedDeals, soldDeals, conversion }) => {
  const summaryData = getSummaryData(totalDeals, processedDeals, soldDeals, conversion);
  return (
    <div className={styles.wrapper}>
      {summaryData.map((el, idx) => (
        <SummaryItem {...el} key={idx} />
      ))}
    </div>
  );
};
