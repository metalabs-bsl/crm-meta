import { Suspense, useEffect } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import cn from 'classnames';
import { getRoutes } from 'router';
import { NotificationLayout } from 'common/containers';
import { Loading } from 'common/ui';
import { Header, Sidebar } from 'common/components';
import { useAppDispatch, useAppSelector, useRedirect } from 'common/hooks';
import { useLazyGetUserInfoQuery } from 'api/admin/employees/employees.api';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import { loginSelectors } from 'api/admin/login/login.selectors';
import { adminPath } from 'types/routes';
import 'react-phone-input-2/lib/style.css';
import styles from './styles.module.scss';

import { initializeSocket } from 'socket';

export const App = () => {
  const redirect = useRedirect();
  const { accessToken } = useAppSelector(loginSelectors.login);
  const { userInfo, role } = useAppSelector(employeesSelectors.employees);

  const routes = useRoutes(getRoutes(role));
  const { pathname } = useLocation();
  const { bgType } = useAppSelector(employeesSelectors.employees);
  const [getData, { isFetching }] = useLazyGetUserInfoQuery();
  const dispatch = useAppDispatch();

  const checkToken = async (token: string) => {
    try {
      const response = await fetch(process.env.REACT_APP_BASE_URL + '/auth/check', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
          'ngrok-skip-browser-warning': 'true'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // 'Токен валиден'
      } else if (response.status === 401) {
        // Clear state and redirect to login
        redirect.login({});
      }
    } catch (error) {
      console.error('Error validating token:', error);
      redirect.login({});
    }
  };

  useEffect(() => {
    if (accessToken && !userInfo) {
      checkToken(accessToken);
      getData();
    }
  }, [accessToken, getData, userInfo]);

  useEffect(() => {
    if (accessToken) {
      dispatch(initializeSocket());
    } else {
      redirect.login({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, dispatch]);

  return (
    <NotificationLayout>
      <Loading isSpin={isFetching}>
        <main className={cn(styles.main, styles[bgType], { [styles.unAuth]: pathname === adminPath.login })}>
          <Header />
          <div className={styles.content}>
            <Sidebar />
            <Suspense fallback={<Loading isSpin />}>{routes}</Suspense>
          </div>
        </main>
      </Loading>
    </NotificationLayout>
  );
};
