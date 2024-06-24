import { FC } from 'react';
import { dateFormat } from 'common/helpers';
import styles from './style.module.scss';

interface IUser {
  name: string;
  phone: string;
  birthday: string;
  city: string;
  source: string;
}

interface ClientProps {
  data: IUser;
}

export const ClientWindow: FC<ClientProps> = ({ data }) => {
  const { name, phone, birthday, city, source } = data;
  const date = dateFormat(birthday);

  return (
    <div className={styles.client_wrapper}>
      <div className={styles.client}>
        <ul>
          <li className={styles.clientTitle}>Клиент</li>
          <li className={styles.clientName}>{name}</li>
        </ul>
        <ul>
          <li className={styles.clientTitleNumber}>Номер телефона</li>
          <li className={styles.clientPhone}>{phone}</li>
        </ul>
        <ul>
          <li className={styles.clientTitleNumber}>Город проживания</li>
          <li className={styles.clientPhone}>{city}</li>
        </ul>
        <ul>
          <li className={styles.clientTitleNumber}>Источник</li>
          <li className={styles.clientPhone}>{source}</li>
        </ul>
        <ul>
          <li className={styles.clientTitleNumber}>Дата рождения</li>
          <li className={styles.clientPhone}>{date}</li>
        </ul>
      </div>
    </div>
  );
};
