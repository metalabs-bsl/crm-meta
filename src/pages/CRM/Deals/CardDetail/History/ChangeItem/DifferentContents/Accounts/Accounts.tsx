import { FC } from 'react';
import { Change } from 'pages/CRM/Deals/CardDetail/CardDetail.helper';
import { Icon } from 'common/ui';
import screen from '../../../../../../../../common/assets/images/testScreen.png';
import styles from './styles.module.scss';

interface IProps {
  data: Change;
}

export const Accounts: FC<IProps> = ({ data }) => {
  return (
    <div className={styles.accounts}>
      <span className={styles.title}>Счета</span>
      <div className={styles.middle}>
        <p className={styles.description}>{data.description}</p>
        <span className={styles.timestamp}>{data.timestamp}</span>
      </div>
      <div className={styles.file}>
        <img src={screen} alt='screen' className={styles.fileScreen} />
        <Icon type='clip' className={styles.clip} />
      </div>
    </div>
  );
};
