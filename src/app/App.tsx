import { Suspense, useEffect } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import { getRoutes } from 'router';
import { Header, Sidebar } from 'common/components';
import { useAppSelector } from 'common/hooks';
import { loginSelectors } from 'api/admin/login/login.selectors';
import { ROLES } from 'types/roles';
import { adminPath } from 'types/routes/admin';
import styles from './styles.module.scss';

export const App = () => {
  const navigate = useNavigate();
  const { role } = useAppSelector(loginSelectors.login);
  const routes = useRoutes(getRoutes(role));

  useEffect(() => {
    if (role === ROLES.UNAUTHORIZED) {
      navigate(adminPath.login);
    }
  }, [navigate, role]);

  return (
    <>
      <Header />
      <div className={styles.main}>
        <Sidebar />
        <Suspense fallback={<p style={{ color: 'red' }}>loading...</p>}>{routes}</Suspense>
      </div>
    </>
  );
};
