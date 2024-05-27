import { FC, ReactNode } from 'react';
import { Button } from 'common/ui';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

interface ModalProps {
  leftBtnText?: string;
  rightBtnText?: string;
  leftBtnStyle: BUTTON_TYPES;
  rightBtnStyle: BUTTON_TYPES;
  onClose: () => void;
  isOpen: boolean;
  children?: ReactNode;
}

export const Modal: FC<ModalProps> = ({ isOpen = false, children, leftBtnText, leftBtnStyle, rightBtnText, rightBtnStyle, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className={styles.modal} onClick={onClose}>
          <div className={styles.modalWrapper} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={onClose}>
              <span></span>
            </button>
            <div className={styles.modalInner}>{children}</div>
            {(leftBtnText || rightBtnText) && (
              <div className={styles.modalBtnWrapper}>
                {leftBtnText && <Button text={leftBtnText} styleType={leftBtnStyle} />}
                {rightBtnText && <Button text={rightBtnText} styleType={rightBtnStyle} onClick={onClose} />}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
