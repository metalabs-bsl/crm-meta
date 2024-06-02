import { Suspense, useEffect } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import cn from 'classnames';
import { getRoutes } from 'router';
import { Header, Sidebar } from 'common/components';
import { useAppSelector } from 'common/hooks';
import { backgroundSelectors } from 'api/admin/background/background.selectors';
import { loginSelectors } from 'api/admin/login/login.selectors';
import { ROLES } from 'types/roles';
import { adminPath } from 'types/routes';
import styles from './styles.module.scss';

export const App = () => {
  const navigate = useNavigate();
  const { role } = useAppSelector(loginSelectors.login);
  const routes = useRoutes(getRoutes(role));
  const { bgType } = useAppSelector(backgroundSelectors.background);
  const unAuth = role === ROLES.UNAUTHORIZED;
  useEffect(() => {
    if (unAuth) {
      navigate(adminPath.login);
    }
  }, [navigate, unAuth]);

  return (
    <main className={cn(styles.main, styles[bgType], { [styles.unAuth]: unAuth })}>
      <Header />
      <div className={styles.content}>
        <Sidebar />
        <Suspense fallback={<p style={{ color: 'red' }}>loading...</p>}>{routes}</Suspense>
      </div>
    </main>
  );
};
