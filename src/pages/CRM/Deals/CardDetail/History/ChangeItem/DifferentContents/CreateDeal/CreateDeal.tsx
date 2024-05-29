import { FC } from 'react';
import { Change } from 'pages/CRM/Deals/CardDetail/CardDetail.helper';
import styles from './styles.module.scss';

interface IProps {
  data: Change;
}

export const CreateDeal: FC<IProps> = ({ data }) => {
  return (
    <div className={styles.deal}>
      <span className={styles.title}>Создание сделки</span>
      <span className={styles.description}>{data.description}</span>
    </div>
  );
};
