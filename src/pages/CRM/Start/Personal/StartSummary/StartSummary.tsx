import { FC, useEffect, useMemo, useState } from 'react';
import { useGetAppSettingsQuery } from 'api/admin/appSettings/appSettings.api';
import { getSummaryData } from '../../Start.helper';
import { SummaryItem } from './SummaryItem';
import conversionIcon from '../../../../../common/assets/images/sold.svg';
import styles from './styles.module.scss';

interface StartSummaryProps {
  totalDeals?: number;
  processedDeals?: number;
  soldDeals?: number;
  conversion?: number;
}

export const StartSummary: FC<StartSummaryProps> = ({ totalDeals, processedDeals, soldDeals, conversion }) => {
  // const summary = getSummaryData(totalDeals, processedDeals, soldDeals, conversion);
  const { data } = useGetAppSettingsQuery();
  const [summaryData, setSummaryData] = useState<
    {
      icon: string;
      title: string;
      value: string;
    }[]
  >([]);

  const summary = useMemo(
    () => getSummaryData(totalDeals, processedDeals, soldDeals, conversion),
    [totalDeals, processedDeals, soldDeals, conversion]
  );

  useEffect(() => {
    if (data) {
      const newSummaryData: {
        icon: string;
        title: string;
        value: string;
      }[] = [];

      summary.forEach((el) => newSummaryData.push(el));
      if (data.bonusEnabled) {
        newSummaryData.push({
          icon: conversionIcon,
          title: 'бонус',
          value: data.bonusPercentage + ''
        });
      }

      if (data.profitEnabled) {
        newSummaryData.push({
          icon: conversionIcon,
          title: 'Бонус за прибыль',
          value: data.profitPercentage.toString() + '%'
        });
      }

      if (data.paxEnabled) {
        newSummaryData.push({
          icon: conversionIcon,
          title: 'Бонус за количество туристов',
          value: data.paxPercentage.toString() + '%'
        });
      }

      if (data.additionalBonusEnabled) {
        newSummaryData.push({
          icon: conversionIcon,
          title: 'Дополнительный бонус',
          value: data.additionalBonusPercentage.toString() + '%'
        });
      }

      if (data.crmManagementEnabled) {
        newSummaryData.push({
          icon: conversionIcon,
          title: 'Бонус за ведение CRM',
          value: data.crmManagementPercentage.toString() + '%'
        });
      }

      setSummaryData(newSummaryData);
    }
  }, [data, summary]);

  return (
    <div className={styles.wrapper}>
      {summaryData
        .filter((el) => el.value !== '-')
        .map((el, idx) => (
          <SummaryItem {...el} key={idx} />
        ))}
    </div>
  );
};
