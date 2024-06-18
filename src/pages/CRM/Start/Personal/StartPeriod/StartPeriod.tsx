import { Icon } from 'common/ui';
import styles from './styles.module.scss';

export const StartPeriod = () => {
  return (
    <div className={styles.content}>
      <div className={styles.info}>
        <p className={styles.title}>Отчетный период:</p>
        <span className={styles.prepositions}>с</span>
        <div className={styles.date}>01.06.2024</div>
        <span className={styles.prepositions}>по</span>
        <div className={styles.date}>30.06.2024</div>
      </div>
      <button>
        Выбрать отчетный период <Icon type='calendar' />
      </button>
    </div>
  );
};
