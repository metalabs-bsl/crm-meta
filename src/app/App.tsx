import { Suspense, useEffect } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import cn from 'classnames';
import { getRoutes } from 'router';
import { NotificationLayout } from 'common/containers';
import { Loading } from 'common/ui';
import { Header, Sidebar } from 'common/components';
import { useAppDispatch, useAppSelector, useRedirect } from 'common/hooks';
import { backgroundSelectors } from 'api/admin/background/background.selectors';
import { useLazyGetUserInfoQuery } from 'api/admin/login/login.api';
import { loginSelectors } from 'api/admin/login/login.selectors';
import { adminPath } from 'types/routes';
import styles from './styles.module.scss';

import { initializeSocket } from 'socket';

export const App = () => {
  const redirect = useRedirect();
  const { role, userInfo, accessToken } = useAppSelector(loginSelectors.login);
  const routes = useRoutes(getRoutes(role));
  const { pathname } = useLocation();
  const { bgType } = useAppSelector(backgroundSelectors.background);
  const [getData] = useLazyGetUserInfoQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!accessToken) {
      redirect.login({});
    }
  }, [accessToken, redirect, role.role_name]);

  useEffect(() => {
    if (accessToken && !userInfo) getData();
  }, [accessToken, getData, userInfo]);

  useEffect(() => {
    dispatch(initializeSocket());
  }, [dispatch]);

  return (
    <NotificationLayout>
      <main className={cn(styles.main, styles[bgType], { [styles.unAuth]: pathname === adminPath.login })}>
        <Header />
        <div className={styles.content}>
          <Sidebar />
          <Suspense fallback={<Loading isSpin />}>{routes}</Suspense>
        </div>
      </main>
    </NotificationLayout>
  );
};
