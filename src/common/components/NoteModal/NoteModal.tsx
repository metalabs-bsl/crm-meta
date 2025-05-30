import { FC } from 'react';
import { Icon } from 'common/ui';
import { dateFormatWithHour } from 'common/helpers';
import { Note } from 'types/entities';
import { Modal } from '../Modal';
import styles from './styles.module.scss';

interface IProps {
  data: Note;
  isOpen?: boolean;
  onCancel?: () => void;
}

export const NoteModal: FC<IProps> = ({ isOpen = false, onCancel, data }) => {
  const date = dateFormatWithHour(data?.date);
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className={styles.modalContent}>
        <Icon type='note' className={styles.icon} />
        <div className={styles.data}>
          <p className={styles.name_wrapper}>
            Запланированное <br /> <span className={styles.name}>{data?.title} </span>
            начнется <span className={styles.name}>{date}</span>
          </p>
          <p className={styles.geolocation}>{data.geolocation}</p>
        </div>
      </div>
    </Modal>
  );
};
