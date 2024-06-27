import { Button } from 'common/ui';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { loginSelectors } from 'api/admin/login/login.selectors';
import { logout } from 'api/admin/login/login.slice';
import { AvatarUpload } from '../AvatarUpload';
import styles from './style.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export const ProfileWindow = () => {
  const dispatch = useAppDispatch();
  const { role, userInfo } = useAppSelector(loginSelectors.login);

  return (
    <div className={styles.profile}>
      <span className={styles.role}> {role.role_name}</span>
      <ul>
        <li className={styles.avatarBlock}>
          <div className={styles.textWrapper}>
            <span className={styles.label}>ФИО</span>
            <span className={styles.name}>
              {userInfo?.first_name} {userInfo?.second_name}
            </span>
          </div>
          <AvatarUpload />
        </li>
        <li>
          <span className={styles.label}>Почта</span>
          <span className={styles.email}>{userInfo?.email}</span>
        </li>
        <li>
          <span className={styles.label}>Номер телефона</span>
          <span className={styles.number}>{userInfo?.phone}</span>
        </li>
      </ul>
      <div className={styles.btnBlock}>
        <Button styleType={BUTTON_TYPES.LINK_RED} text='выйти' onClick={() => dispatch(logout())} />
      </div>
    </div>
  );
};
