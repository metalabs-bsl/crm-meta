import { type FC } from 'react';
import { LeadFly } from 'types/entities/calendar';
import { Modal } from '../Modal';
import styles from './styles.module.scss';

interface IProps {
  data?: LeadFly;
  isOpen?: boolean;
  onCancel?: () => void;
}

export const LeadFlyModal: FC<IProps> = ({ isOpen = false, onCancel, data }) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className={styles.modalContent}>
        <p className={styles.name_wrapper}>Лид {data?.lead_name || 'Неизвестный лид'}</p>
        <p className={styles.phone_wrapper}>
          Номер телефона: <span className={styles.phone}>{data?.phone ? `+${data.phone}` : 'N/A'}</span>
        </p>
        <div className={styles.adventureContent}>
          <p className={styles.city_wrapper}>
            Город вылета: <span className={styles.city}>{data?.departure_city || 'N/A'}</span>
          </p>
          <p className={styles.date_wrapper}>
            Дата и время вылета:{' '}
            <span className={styles.date}>
              {data?.departure_date
                ? new Date(data.departure_date).toLocaleString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })
                : 'N/A'}
            </span>
          </p>
        </div>
        <div className={styles.adventureContent}>
          <p className={styles.city_wrapper}>
            Город прилета: <span className={styles.city}>{data?.destination || 'N/A'}</span>
          </p>
          <p className={styles.date_wrapper}>
            Дата и время прилета:{' '}
            <span className={styles.date}>
              {data?.destination_date
                ? new Date(data.destination_date).toLocaleString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })
                : 'N/A'}
            </span>
          </p>
        </div>
      </div>
    </Modal>
  );
};
