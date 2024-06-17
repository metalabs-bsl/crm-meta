import { FC } from 'react';
import styles from './style.module.scss';

interface ClientProps {
  clientName: string;
  clientPhoneNumber: string;
  clientDate: string;
}

const ClientWindow: FC<ClientProps> = ({ clientName, clientPhoneNumber, clientDate }) => {
  return (
    <div className={styles.client_wrapper}>
      <div className={styles.client}>
        <ul>
          <li className={styles.clientTitle}>Клиент</li>
          <li className={styles.clientName}>{clientName}</li>
        </ul>
        <ul>
          <li className={styles.clientTitleNumber}>Номер телефона</li>
          <li className={styles.clientPhone}>{clientPhoneNumber}</li>
        </ul>
        <div className={styles.client_date}>{clientDate}</div>
      </div>
    </div>
  );
};

export default ClientWindow;
