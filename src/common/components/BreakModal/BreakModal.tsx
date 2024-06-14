import { FC } from 'react';
import { Icon } from 'common/ui';
import { Modal } from '../Modal';
import styles from './styles.module.scss';

interface IProps {
  data?: string;
  isOpen?: boolean;
  onCancel?: () => void;
}

export const BreakModal: FC<IProps> = ({ isOpen = false, onCancel, data }) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className={styles.modalContent}>
        <Icon type='break' className={styles.icon} />
        <div className={styles.data}>
          <p className={styles.name_wrapper}>
            До окончания перерыва <br /> осталось <span className={styles.name}>{data}</span>
          </p>
        </div>
      </div>
    </Modal>
  );
};
