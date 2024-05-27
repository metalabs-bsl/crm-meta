import { FC, ReactNode } from 'react';
import cn from 'classnames';
import { Icon } from 'common/ui';
import styles from './style.module.scss';

interface IProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export const EdgeModal: FC<IProps> = ({ isOpen = false, onClose, children }) => {
  return (
    <div className={cn(styles.edgeMask, { [styles.closed]: !isOpen })} onClick={onClose}>
      <div className={styles.edgeModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.close} onClick={onClose}>
          <Icon type='burger-close' />
        </div>
        {children}
      </div>
    </div>
  );
};
