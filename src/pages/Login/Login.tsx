import { FC } from 'react';
import { LoginForm } from './LoginForm/LoginForm';
import styles from './styles.module.scss';

export const Login: FC = () => {
  return (
    <div className={styles.loginPage}>
      <h1>Страница входа</h1>
      <LoginForm />
    </div>
  );
};
