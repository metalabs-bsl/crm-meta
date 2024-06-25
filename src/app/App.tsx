import { Suspense, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import cn from 'classnames';
import { getRoutes } from 'router';
import { NotificationLayout } from 'common/containers';
import { Loading } from 'common/ui';
import { Header, Sidebar } from 'common/components';
import { useAppSelector, useRedirect } from 'common/hooks';
import { backgroundSelectors } from 'api/admin/background/background.selectors';
import { loginSelectors } from 'api/admin/login/login.selectors';
import { ROLES } from 'types/roles';
import styles from './styles.module.scss';

export const App = () => {
  const redirect = useRedirect();
  const { role } = useAppSelector(loginSelectors.login);
  const routes = useRoutes(getRoutes(role));
  const { bgType } = useAppSelector(backgroundSelectors.background);
  const unAuth = role === ROLES.UNAUTHORIZED;

  useEffect(() => {
    if (unAuth) {
      redirect.login({});
    }
  }, [redirect, unAuth]);

  return (
    <NotificationLayout>
      <main className={cn(styles.main, styles[bgType], { [styles.unAuth]: unAuth })}>
        <Header />
        <div className={styles.content}>
          <Sidebar />
          <Suspense fallback={<Loading isSpin />}>{routes}</Suspense>
        </div>
      </main>
    </NotificationLayout>
  );
};
