import { FC } from 'react';
import { Icon } from 'common/ui';
import styles from './styles.module.scss';

interface IProps {
  isAccess: boolean;
  setIsAccess: (e: boolean) => void;
}

export const AccessChangeble: FC<IProps> = ({ isAccess, setIsAccess }) => {
  return (
    <div className={styles.access} onClick={() => setIsAccess(!isAccess)}>
      <span>Доступ {isAccess ? 'открыт' : 'закрыт'}</span>
      <Icon type={`calc-${isAccess ? 'open' : 'close'}`} />
    </div>
  );
};
