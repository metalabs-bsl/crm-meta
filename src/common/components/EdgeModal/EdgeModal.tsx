import { FC, ReactNode } from 'react';
import cn from 'classnames';
import { Icon } from 'common/ui';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { sidebarSelectors } from 'api/admin/sidebar/sidebar.selectors';
import { setChangeOpenEdgeModal, setIsNewDeal } from 'api/admin/sidebar/sidebar.slice';
import styles from './style.module.scss';

interface IProps {
  children?: ReactNode;
}

export const EdgeModal: FC<IProps> = ({ children }) => {
  const { isOpenEdgeModal } = useAppSelector(sidebarSelectors.sidebar);
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(setChangeOpenEdgeModal(false));
    dispatch(setIsNewDeal(false));
  };

  return (
    <div className={cn(styles.edgeMask, { [styles.closed]: !isOpenEdgeModal })} onClick={onClose}>
      <div className={styles.edgeModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.close} onClick={onClose}>
          <Icon type='burger-close' />
        </div>
        {children}
      </div>
    </div>
  );
};
