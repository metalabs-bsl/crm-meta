import { FC } from 'react';
import { Icon } from 'common/ui';
import { Modal } from '../Modal';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';
interface IProps {
  isOpen?: boolean;
  text: string;
  onDelete?: () => void;
  onCancel?: () => void;
}

export const DeleteModal: FC<IProps> = ({ isOpen = false, onDelete, onCancel, text }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      leftBtnStyle={BUTTON_TYPES.YELLOW}
      leftBtnText='да, удалить'
      leftBtnAction={onDelete}
      rightBtnStyle={BUTTON_TYPES.Link_BLACK}
      rightBtnText='отменить'
      rightBtnAction={onCancel}
    >
      <div className={styles.modalContent}>
        <Icon type='delete' className={styles.icon} />
        <p className={styles.text}>{text}</p>
      </div>
    </Modal>
  );
};
