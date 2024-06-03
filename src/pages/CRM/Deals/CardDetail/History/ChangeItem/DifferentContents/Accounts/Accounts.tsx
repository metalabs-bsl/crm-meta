import { FC } from 'react';
import { Change } from 'pages/CRM/Deals/CardDetail/CardDetail.helper';
import styles from './styles.module.scss';

interface IProps {
  data: Change;
}

export const Accounts: FC<IProps> = ({}) => {
  return (
    <div className={styles.accounts}>
      <span className={styles.title}>Первая часть</span>
      <div className={styles.middle}>
        <a target='_blank' href='#' className={styles.link}>
          Счет об оплате первая часть.jpeg
        </a>
      </div>
    </div>
  );
};
