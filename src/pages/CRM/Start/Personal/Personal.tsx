import { StartTable } from '../StartTable';
import { StartPeriod } from './StartPeriod';
import { StartSummary } from './StartSummary';
import styles from './styles.module.scss';

export const Personal = () => {
  return (
    <div className={styles.content}>
      <StartSummary />
      <StartPeriod />
      <StartTable />
    </div>
  );
};
