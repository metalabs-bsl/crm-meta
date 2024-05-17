import { Button } from 'common/ui';
import { useAppSelector } from 'common/hooks';
import { loginSelectors } from 'api/admin/login/login.selectors';
import styles from './style.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export const ProfileWindow = () => {
  const { role } = useAppSelector(loginSelectors.login);

  return (
    <div className={styles.profile}>
      <span className={styles.role}> {role.title}</span>
      <ul>
        <li>
          <span className={styles.label}>ФИО</span>
          <span className={styles.name}>Азатов Азат</span>
        </li>
        <li>
          <span className={styles.label}>Почта</span>
          <span className={styles.email}>azatovazat@gmail.com</span>
        </li>
        <li>
          <span className={styles.label}>Номер телефона</span>
          <span className={styles.number}>+996500500500</span>
        </li>
      </ul>
      <div className={styles.btnBlock}>
        <Button type={BUTTON_TYPES.LINK_RED} text='выйти' onClick={() => console.log('logout')} />
      </div>
    </div>
  );
};
