import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Badge } from 'common/ui';
import { useAppSelector, useRedirect } from 'common/hooks';
import { INavbar } from 'common/constants';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import styles from './styles.module.scss';

import { NAVBAR_PAGES } from 'types/enums';

interface IProps {
  navbarItems: INavbar;
  page: NAVBAR_PAGES;
  accountsBadge?: number;
}

export const Navbar: FC<IProps> = ({ navbarItems, page, accountsBadge }) => {
  const redirectTo = useRedirect();
  const { pathname } = useLocation();
  const { role } = useAppSelector(employeesSelectors.employees);

  const onNavigate = (chapter: string) => {
    redirectTo[page]({ chapter });
  };

  return (
    <nav className={styles.navBar}>
      <ul>
        {Object.values(navbarItems).map((item, index) => {
          if (!!item.allowRoles.length && !item.allowRoles.includes(role)) {
            return null;
          }

          return (
            <li
              key={index}
              className={cn({ [styles.activeChapter]: pathname.includes(item.chapter) })}
              onClick={() => onNavigate(item.chapter)}
            >
              {item.chapter === 'accounts' ? <Badge count={accountsBadge || 0}>{item.title}</Badge> : item.title}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
