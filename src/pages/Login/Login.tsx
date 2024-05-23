import { FC } from 'react';
import { LoginForm } from './LoginForm/LoginForm';
import logo from '../../common/assets/icons/header/logo.svg';
import styles from './styles.module.scss';

export const Login: FC = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.block}>
        <div className={styles.logoBlock}>
          <img src={logo} alt='logo' className={styles.logo} />
        </div>
        <LoginForm />
      </div>
    </div>
  );
};
