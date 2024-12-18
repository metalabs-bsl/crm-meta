import { type FC } from 'react';
import styles from './styles.module.scss';
import { Modal } from '../Modal';
import { ICreateLeadParams, ITourData } from 'types/entities';

interface IProps {
  data?: ICreateLeadParams & ITourData;
  isOpen?: boolean;
  onCancel?: () => void;
}

export const LeadFlyModal: FC<IProps> = ({ isOpen = false, onCancel, data }) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className={styles.modalContent}>
          <p className={styles.name_wrapper}>
            Лид {data?.lead_name}
          </p>
          <p className={styles.phone_wrapper}>
            номер телефона: <span className={styles.phone}>+{data?.customer_phone}</span>
          </p>
          <div className={styles.adventureContent}>
          <p className={styles.city_wrapper}>
            Город вылета: <span className={styles.city}>{data?.departure_city}</span>
          </p>
          <p className={styles.date_wrapper}>
            Время вылета: <span className={styles.date}>{data?.departure_date}</span>
          </p>
          </div>
          <div className={styles.adventureContent}>
          <p className={styles.city_wrapper}>
            Город прилета: <span className={styles.city}>{data?.arrival_city}</span>
          </p>
          <p className={styles.date_wrapper}>
            Время прилета: <span className={styles.date}>{data?.arrival_date}</span>
          </p>
          </div>
      </div>
    </Modal>
  );
};
