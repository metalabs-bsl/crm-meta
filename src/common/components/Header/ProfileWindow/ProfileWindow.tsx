import { FC } from 'react';
import { Button } from 'common/ui';
import { dateFormat } from 'common/helpers';
import { useAppSelector, useNotify } from 'common/hooks';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import { useLogoutMutation } from 'api/admin/login/login.api';
import { AvatarUpload } from '../AvatarUpload';
import styles from './style.module.scss';

import { BUTTON_TYPES } from 'types/enums';
interface IProps {
  onClose: () => void;
}

export const ProfileWindow: FC<IProps> = ({ onClose }) => {
  const { userInfo } = useAppSelector(employeesSelectors.employees);

  const [handleLogout] = useLogoutMutation();
  const notify = useNotify();

  if (!userInfo) {
    return null;
  }

  const onLogout = () => {
    handleLogout()
      .unwrap()
      .then((res) => {
        notify(res.message, 'success');
        onClose();
      });
  };

  return (
    <div className={styles.profile}>
      <span className={styles.role}> {userInfo?.job_title}</span>
      <ul>
        <li className={styles.avatarBlock}>
          <div className={styles.textWrapper}>
            <span className={styles.label}>ФИО</span>
            <span className={styles.name}>
              {userInfo?.first_name || '-'} {userInfo?.second_name || '-'}
            </span>
          </div>
          <AvatarUpload file={userInfo.avatar?.path} />
        </li>
        <li>
          <span className={styles.label}>Почта</span>
          <span className={styles.email}>{userInfo?.email || '-'}</span>
        </li>
        <li>
          <span className={styles.label}>Номер телефона</span>
          <span className={styles.number}>+{userInfo?.phone || '-'}</span>
        </li>
        <li>
          <span className={styles.label}>Дата начала работы</span>
          <span className={styles.number}>{dateFormat(userInfo?.start_of_work) || '-'}</span>
        </li>
      </ul>
      <div className={styles.btnBlock}>
        <Button styleType={BUTTON_TYPES.LINK_RED} text='выйти' onClick={onLogout} />
      </div>
    </div>
  );
};
