import { FC } from 'react';
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
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>();
  const notify = useNotify();
  const redirect = useRedirect();
  const [getUserInfo, { isFetching }] = useLazyGetUserInfoQuery();
  const [login, { isLoading }] = useLoginMutation();
  const isFormValid = Object.keys(errors).length === 0;

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const loginData = {
      login: data.email,
      password: data.password
    };
    login(loginData)
      .unwrap()
      .then(() =>
        getUserInfo()
          .unwrap()
          .then(() => redirect.crm({ chapter: crmChapters.transactions.chapter }))
          .catch(() => notify(MESSAGE.ERROR, 'error'))
      )
      .catch(() => notify(MESSAGE.ERROR, 'error'));
  };

  return (
    <Loading isSpin={isLoading || isFetching}>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <h1>Авторизация</h1>
        <Input {...register('email', { required: 'Email is required' })} placeholder='Логин' className={styles.loginInp} />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}

        <Input
          placeholder='Пароль'
          className={styles.loginInp}
          type='password'
          {...register('password', { required: 'Password is required' })}
        />
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
