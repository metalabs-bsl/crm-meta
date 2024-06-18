import { SummaryItem } from './SummaryItem';
import conversionIcon from './images/conversion.svg';
import dealsIcon from './images/deals.svg';
import processedIcon from './images/processed.svg';
import soldIcon from './images/sold.svg';
import styles from './styles.module.scss';

const summaryData = [
  { icon: dealsIcon, title: 'всего сделок', value: '20' },
  { icon: processedIcon, title: 'обработано сделок', value: '20' },
  { icon: soldIcon, title: 'продано сделок', value: '15' },
  { icon: conversionIcon, title: 'конверсия', value: '5%' }
];

export const StartSummary = () => {
  return (
    <div className={styles.wrapper}>
      {summaryData.map((el, idx) => (
        <SummaryItem {...el} key={idx} />
      ))}
    </div>
  );
};
