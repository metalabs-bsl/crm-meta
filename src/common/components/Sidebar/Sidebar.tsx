import cn from 'classnames';
import { useAppSelector } from 'common/hooks';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import { sidebarSelectors } from 'api/admin/sidebar/sidebar.selectors';
import { ROLES } from 'types/roles';
import Chapters from './Chapters/Chapters';
import styles from './styles.module.scss';

export const Sidebar = () => {
  const { isShowSidebar } = useAppSelector(sidebarSelectors.sidebar);
  const { role } = useAppSelector(employeesSelectors.employees);

  if (role === ROLES.UNAUTHORIZED) {
    return null;
  }
  return (
    <aside className={cn(styles.sidebar, { [styles.isClosed]: isShowSidebar })}>
      <Chapters />
    </aside>
  );
};
