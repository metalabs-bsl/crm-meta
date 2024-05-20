import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { useAppSelector, useRedirect } from 'common/hooks';
import { INavbar } from 'common/constants';
import { loginSelectors } from 'api/admin/login/login.selectors';
import styles from './styles.module.scss';

import { NAVBAR_PAGES } from 'types/enums';

interface IProps {
  navbarItems: INavbar;
  page: NAVBAR_PAGES;
}

export const Navbar: FC<IProps> = ({ navbarItems, page }) => {
  const redirectTo = useRedirect();
  const { pathname } = useLocation();
  const { role } = useAppSelector(loginSelectors.login);

  const onNavigate = (chapter: string) => {
    redirectTo[page]({ chapter });
  };

  return (
    <nav className={styles.navBar}>
      <ul>
        {Object.values(navbarItems).map((item, index) => {
          if (!!item.allowRoles.length && !item.allowRoles.includes(role.role)) {
            return null;
          }
          return (
            <li
              className={cn({ [styles.activeChapter]: pathname.includes(item.chapter) })}
              key={index}
              onClick={() => onNavigate(item.chapter)}
            >
              {item.title}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
