import { FC } from 'react';
import { Icon, Loading } from 'common/ui';
import styles from './styles.module.scss';

interface IProps {
  isAccess?: boolean;
  onUpdateAccess?: () => void;
  isLoading?: boolean;
}

export const AccessChangeble: FC<IProps> = ({ isAccess = true, onUpdateAccess, isLoading = false }) => {
  return (
    <div>
      <Loading isSpin={isLoading}>
        <div className={styles.access} onClick={onUpdateAccess}>
          <span>Доступ {isAccess ? 'открыт' : 'закрыт'}</span>
          <Icon type={`calc-${isAccess ? 'open' : 'close'}`} />
        </div>
      </Loading>
    </div>
  );
};
