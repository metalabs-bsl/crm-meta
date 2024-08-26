import { FC } from 'react';
import styles from './styles.module.scss';

interface IContractModalProps {
  name: string;
  phone: string;
  city: string;
  source: string;
  dateOfBirth: string;
}

export const ContractModal: FC<IContractModalProps> = ({ name, phone, city, source, dateOfBirth }) => {
  return (
    <div className={styles.contract_wrapper}>
      <div className={styles.contract}>
        <ul>
          <li className={styles.contractTitle}>Клиент</li>
          <li className={styles.contractName}>{name}</li>
        </ul>
        <ul>
          <li className={styles.contractTitleNumber}>Номер телефона</li>
          <li className={styles.contractPhone}>{phone}</li>
        </ul>
        <ul>
          <li className={styles.contractTitleNumber}>Город проживания</li>
          <li className={styles.contractPhone}>{city}</li>
        </ul>
        <ul>
          <li className={styles.contractTitleNumber}>Источник</li>
          <li className={styles.contractPhone}>{source}</li>
        </ul>
        <ul>
          <li className={styles.contractTitleNumber}>Дата рождения</li>
          <li className={styles.contractPhone}>{dateOfBirth}</li>
        </ul>
      </div>
    </div>
  );
};
