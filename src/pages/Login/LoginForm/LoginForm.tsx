import { FC, useEffect, useState } from 'react';
import { Button, Checkbox, Input, Loading } from 'common/ui';
import { useNotify, useRedirect } from 'common/hooks';
import { crmChapters, MESSAGE } from 'common/constants';
import { useLazyGetUserInfoQuery } from 'api/admin/employees/employees.api';
import { useLoginMutation } from 'api/admin/login/login.api';
import styles from './styles.module.scss';

import { SubmitHandler, useForm } from 'react-hook-form';
import { BUTTON_TYPES } from 'types/enums';

interface IFormInput {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const LoginForm: FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<IFormInput>();
  const notify = useNotify();
  const redirect = useRedirect();
  const [getUserInfo, { isFetching }] = useLazyGetUserInfoQuery();
  const [login, { isLoading }] = useLoginMutation();
  const isFormValid = Object.keys(errors).length === 0;

  useEffect(() => {
    const fetchCredentials = async () => {
      if ('credentials' in navigator) {
        try {
          const cred = (await navigator.credentials.get({ password: true })) as PasswordCredential;
          if (cred) {
            setValue('email', cred.id);
            setValue('password', cred.password || '');
          }
        } catch (error) {
          console.error('Error retrieving credentials:', error);
        }
      }
    };

    fetchCredentials();
  }, [setValue]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const loginData = {
      login: data.email,
      password: data.password
    };

    login(loginData)
      .unwrap()
      .then(() => {
        if (data.rememberMe && 'credentials' in navigator) {
          const cred = new PasswordCredential({
            id: data.email,
            password: data.password
          });

          navigator.credentials.store(cred);
        }

        getUserInfo()
          .unwrap()
          .then(() => redirect.crm({ chapter: crmChapters.transactions.chapter }))
          .catch(() => notify(MESSAGE.ERROR, 'error'));
      })
      .catch(() => notify(MESSAGE.ERROR, 'error'));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Loading isSpin={isLoading || isFetching}>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <h1>Авторизация</h1>
        <Input {...register('email', { required: 'Email is required' })} placeholder='Логин' className={styles.loginInp} />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}

        <div className={styles.passwordContainer}>
          <Input
            placeholder='Пароль'
            className={styles.loginInp}
            type={showPassword ? 'text' : 'password'}
            {...register('password', { required: 'Password is required' })}
          />
          <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
            {showPassword ? (
              <svg width='24' height='24' viewBox='0 0 24 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M22.6801 6.35145C22.9644 6.66646 23.1218 7.0757 23.1218 7.50003C23.1218 7.92435 22.9644 8.3336 22.6801 8.6486C20.8801 10.5857 16.7829 14.3572 12.0001 14.3572C7.21723 14.3572 3.12008 10.5857 1.32008 8.6486C1.03579 8.3336 0.878418 7.92435 0.878418 7.50003C0.878418 7.0757 1.03579 6.66646 1.32008 6.35145C3.12008 4.41431 7.21723 0.642883 12.0001 0.642883C16.7829 0.642883 20.8801 4.41431 22.6801 6.35145Z'
                  stroke='#686A67'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M12.0001 10.9286C13.8937 10.9286 15.4287 9.39359 15.4287 7.50004C15.4287 5.6065 13.8937 4.07147 12.0001 4.07147C10.1066 4.07147 8.57153 5.6065 8.57153 7.50004C8.57153 9.39359 10.1066 10.9286 12.0001 10.9286Z'
                  stroke='#686A67'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            ) : (
              <svg width='24' height='24' viewBox='0 0 24 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M21.0687 7.25732C21.7202 7.84018 22.2687 8.4059 22.6802 8.85161C22.9645 9.16661 23.1218 9.57586 23.1218 10.0002C23.1218 10.4245 22.9645 10.8338 22.6802 11.1488C20.8802 13.0859 16.783 16.8573 12.0002 16.8573H11.3145'
                  stroke='#686A67'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M6.63437 15.3659C4.6486 14.2538 2.85433 12.8299 1.32008 11.1488C1.03579 10.8338 0.878418 10.4245 0.878418 10.0002C0.878418 9.57589 1.03579 9.16664 1.32008 8.85164C3.12008 6.91449 7.21723 3.14307 12.0001 3.14307C13.8854 3.18247 15.7306 3.69534 17.3658 4.63449'
                  stroke='#686A67'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path d='M21.4287 0.571533L2.57153 19.4287' stroke='#686A67' strokeLinecap='round' strokeLinejoin='round' />
                <path
                  d='M9.58296 12.4172C8.9391 11.7772 8.57536 10.908 8.57153 10.0001C8.57153 9.09079 8.93276 8.21872 9.57574 7.57574C10.2187 6.93276 11.0908 6.57153 12.0001 6.57153C12.908 6.57536 13.7772 6.9391 14.4172 7.58296'
                  stroke='#686A67'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M14.9829 11.7144C14.6778 12.236 14.2401 12.6677 13.7144 12.9658'
                  stroke='#686A67'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            )}
          </span>
        </div>
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}

        <div className={styles.checkboxContainer}>
          <Checkbox {...register('rememberMe')} />
          <label className={styles.label}>Запомнить меня</label>
        </div>

        <Button styleType={BUTTON_TYPES.YELLOW} text='Войти' className={styles.btn} disabled={!isFormValid} />
      </form>
    </Loading>
  );
};
