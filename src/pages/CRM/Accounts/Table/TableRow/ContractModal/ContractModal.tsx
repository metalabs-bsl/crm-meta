import { FC } from 'react';
import styles from './styles.module.scss';

interface IProps {
  name: string;
  phone: string;
}

export const ContractModal: FC<IProps> = ({ name, phone }) => {
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
      </div>
    </div>
  );
};
