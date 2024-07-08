import { FC, useEffect } from 'react';
import { Icon } from 'common/ui';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useGetAppSettingsQuery, useUpdateAppSettingsMutation } from 'api/admin/appSettings/appSettings.api';
import styles from './styles.module.scss';

interface IProps {
  isAccess: boolean;
  setIsAccess: (e: boolean) => void;
  isDeal?: boolean;
}

export const AccessChangeble: FC<IProps> = ({ isAccess, setIsAccess, isDeal }) => {
  const { data } = useGetAppSettingsQuery();
  const [updateAppSettings] = useUpdateAppSettingsMutation();
  const notify = useNotify();

  useEffect(() => {
    isDeal && data && setIsAccess(data.is_calculator_open);
  }, [data]);

  const onToggleAccess = () => {
    isDeal &&
      data?.id &&
      updateAppSettings({ is_calculator_open: !isAccess })
        .unwrap()
        .then(() => {
          notify(MESSAGE.UPDATED, 'success');
        });
    setIsAccess(!isAccess);
  };

  return (
    <div className={styles.access} onClick={onToggleAccess}>
      <span>Доступ {isAccess ? 'открыт' : 'закрыт'}</span>
      <Icon type={`calc-${isAccess ? 'open' : 'close'}`} />
    </div>
  );
};
