import { FC } from 'react';
import { Icon } from 'common/ui';
import { Birthday } from 'types/entities';
import { Modal } from '../Modal';
import styles from './styles.module.scss';

interface IProps {
  data?: Birthday;
  isOpen?: boolean;
  onCancel?: () => void;
}

export const BirthDayModal: FC<IProps> = ({ isOpen = false, onCancel, data }) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className={styles.modalContent}>
        <div className={styles.icon_wrapper}>
          <Icon type='birthday' className={styles.icon} />
        </div>
        <div className={styles.data}>
          <p className={styles.name_wrapper}>
            День рождения {data?.type === 1 ? 'сотрудника' : 'клиента'} <br /> <span className={styles.name}>{data?.name}</span>
          </p>
          <p className={styles.phone_wrapper}>
            номер телефона: <span className={styles.phone}>{data?.phone}</span>
          </p>
        </div>
      </div>
    </Modal>
  );
};
