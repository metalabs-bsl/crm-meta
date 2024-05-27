import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './style.module.scss';

interface IProps {
  targetRef: React.MutableRefObject<HTMLElement | null>;
  isOpen: boolean;
  children?: ReactNode;
  onClose: () => void;
}

export const DropdownModal: FC<IProps> = ({ isOpen = false, children, targetRef, onClose }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //за отностительную позицию от кликнутого элемента, который открывает DropdownModal
    if (isOpen && targetRef.current && modalRef.current) {
      const { top, left, height, width } = targetRef.current.getBoundingClientRect();
      const { width: modalWidth } = modalRef.current.getBoundingClientRect();
      setPosition({ top: top + height + 30, left: left - modalWidth / 2 + width / 2 });
    }
  }, [isOpen, targetRef]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        targetRef.current &&
        !targetRef.current.contains(event.target as Node)
      ) {
        // Если клик был за пределами модального окна, закрыть его
        onClose();
      }
    }

    // Добавляем обработчик клика при открытии модального окна
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, targetRef]);

  const modalRoot = document.getElementById('root');
  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div className={styles.container} ref={modalRef} style={{ top: position.top, left: position.left, display: isOpen ? 'block' : 'none' }}>
      <div className={styles.arrow} />
      {children}
    </div>,
    modalRoot
  );
};
