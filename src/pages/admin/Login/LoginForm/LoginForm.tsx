import { FC } from 'react';
import styles from './styles.module.scss';

export const LoginForm: FC = () => {
  const login = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const userData = {
      email,
      password
    };
    console.log('userData', userData);
  };

  return (
    <form className={styles.loginForm} onSubmit={login}>
      <input type='email' name='email' />
      <input type='password' name='password' />
      <button type='submit'>Войти</button>
    </form>
  );
};
