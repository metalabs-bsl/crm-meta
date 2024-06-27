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
  const [isAbove, setIsAbove] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && targetRef.current && modalRef.current) {
      const { top, left, height, width } = targetRef.current.getBoundingClientRect();
      const { height: modalHeight, width: modalWidth } = modalRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const spaceBelow = viewportHeight - (top + height) - 30;
      const spaceAbove = top - 30;

      let topPosition = top + height + 30;
      let above = false;
      if (spaceBelow < modalHeight && spaceAbove > modalHeight) {
        topPosition = top - modalHeight - 30;
        above = true;
      }

      setPosition({ top: topPosition, left: left - modalWidth / 2 + width / 2 });
      setIsAbove(above);
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
        onClose();
      }
    }

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
      <div className={`${styles.arrow} ${isAbove ? styles.arrowDown : ''}`} />
      {children}
    </div>,
    modalRoot
  );
};
