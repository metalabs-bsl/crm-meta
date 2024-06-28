import { FC, ReactNode } from 'react';
import cn from 'classnames';
import { Button, Icon } from 'common/ui';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

interface ModalProps {
  leftBtnText?: string;
  rightBtnText?: string;
  leftBtnStyle?: BUTTON_TYPES;
  rightBtnStyle?: BUTTON_TYPES;
  onClose?: () => void;
  isOpen: boolean;
  children?: ReactNode;
  leftBtnAction?: () => void;
  rightBtnAction?: () => void;
  className?: string;
}

export const Modal: FC<ModalProps> = ({
  leftBtnAction,
  rightBtnAction,
  isOpen = false,
  leftBtnText,
  leftBtnStyle,
  rightBtnText,
  rightBtnStyle,
  children,
  onClose,
  className
}) => {
  return (
    <>
      {isOpen && (
        <div className={styles.modal} onClick={onClose}>
          <div className={cn(styles.modalWrapper, className)} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={onClose}>
              <Icon type='burger-close' />
            </button>
            <div className={styles.modalInner}>{children}</div>
            {(leftBtnText || rightBtnText) && (
              <div className={styles.modalBtnWrapper}>
                {leftBtnText && <Button text={leftBtnText} styleType={leftBtnStyle} onClick={leftBtnAction} />}
                {rightBtnText && <Button text={rightBtnText} styleType={rightBtnStyle} onClick={rightBtnAction} />}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
