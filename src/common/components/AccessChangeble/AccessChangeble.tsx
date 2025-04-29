import { FC } from 'react';
import { Icon, Loading } from 'common/ui';
import styles from './styles.module.scss';

interface IProps {
  isAccess?: boolean;
  onUpdateAccess?: () => void;
  isLoading?: boolean;
  currentStage?: number | string;
  userRole?: string;
  canAlwaysEdit?: boolean;
}

export const AccessChangeble: FC<IProps> = ({
  isAccess = true,
  onUpdateAccess,
  isLoading = false,
  currentStage,
  canAlwaysEdit = false
}) => {
  const isBookingStage = currentStage === 'бронирование';
  const canEdit = canAlwaysEdit || isBookingStage;

  const handleClick = () => {
    if (canEdit && onUpdateAccess) {
      onUpdateAccess();
    }
  };

  return (
    <div>
      <Loading isSpin={isLoading}>
        <div className={styles.access} onClick={handleClick} style={{ cursor: canEdit ? 'pointer' : 'not-allowed' }}>
          <span>Доступ {isAccess ? 'открыт' : 'закрыт'}</span>
          <Icon type={`calc-${isAccess ? 'open' : 'close'}`} />
        </div>
      </Loading>
    </div>
  );
};
