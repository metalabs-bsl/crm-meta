import cn from 'classnames';
import { useAppSelector } from 'common/hooks';
import { loginSelectors } from 'api/admin/login/login.selectors';
import { sidebarSelectors } from 'api/admin/sidebar/sidebar.selectors';
import { ROLES } from 'types/roles';
import Chapters from './Chapters/Chapters';
import styles from './styles.module.scss';

export const Sidebar = () => {
  const { isShowSidebar } = useAppSelector(sidebarSelectors.sidebar);
  const { role } = useAppSelector(loginSelectors.login);

  if (role === ROLES.UNAUTHORIZED) {
    return null;
  }
  return (
    <aside className={cn(styles.sidebar, { [styles.isClosed]: isShowSidebar })}>
      <Chapters />
    </aside>
  );
};
