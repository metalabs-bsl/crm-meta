import { FC } from 'react';
import { Icon, Loading } from 'common/ui';
import styles from './styles.module.scss';
// import { ROLES } from 'types/roles';

interface IProps {
  isAccess?: boolean;
  onUpdateAccess?: () => void;
  isLoading?: boolean;
  currentStage?: number | string;
  // userRole?: string
}

export const AccessChangeble: FC<IProps> = ({ isAccess = true, onUpdateAccess, isLoading = false, currentStage }) => {
  const isBookingStage = currentStage === 'бронирование';
  // const  canEdit = userRole === ROLES.SENIOR_MANAGER || ROLES.DIRECTOR

  const handleClick = () => {
    if (isBookingStage && onUpdateAccess) {
      onUpdateAccess();
    }
  };

  return (
    <div>
      <Loading isSpin={isLoading}>
        <div className={styles.access} onClick={handleClick} style={{ cursor: isBookingStage ? 'pointer' : 'not-allowed' }}>
          <span>Доступ {isAccess ? 'открыт' : 'закрыт'}</span>
          <Icon type={`calc-${isAccess ? 'open' : 'close'}`} />
        </div>
      </Loading>
    </div>
  );
};
