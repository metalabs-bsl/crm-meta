import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Badge } from 'common/ui';
import { useAppSelector, useRedirect } from 'common/hooks';
import { INavbar } from 'common/constants';
import { useGetAllAccountsQuery } from 'api/admin/accounts/accounts.api';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import { IAccountData } from 'types/entities';
import styles from './styles.module.scss';

import { NAVBAR_PAGES } from 'types/enums';

interface IProps {
  navbarItems: INavbar;
  page: NAVBAR_PAGES;
}

export const Navbar: FC<IProps> = ({ navbarItems, page }) => {
  const redirectTo = useRedirect();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const { role } = useAppSelector(employeesSelectors.employees);

  const params = new URLSearchParams(search);
  const isFull = params.get('isFull') ?? 'false';

  const { data: accounts } = useGetAllAccountsQuery(isFull) as { data?: IAccountData[] };

  const unpaidCount = accounts
    ? accounts.filter((acc) => {
        const det = acc.paymentDetails || [];
        if (det.length === 0) return true;
        const allPaid = det.every((d) => d.isPaid);
        const nonePaid = det.every((d) => !d.isPaid);
        return nonePaid || (!allPaid && !nonePaid);
      }).length
    : 0;

  const onNavigate = (chapter: string) => {
    if (chapter === 'accounts') {
      navigate({ pathname: '/crm/accounts', search: `?isFull=${isFull}` });
    } else {
      redirectTo[page]({ chapter });
    }
  };

  return (
    <nav className={styles.navBar}>
      <ul>
        {Object.values(navbarItems).map((item, i) => {
          if (item.allowRoles.length && !item.allowRoles.includes(role)) return null;

          const isActive = pathname.includes(item.chapter);
          const title = item.chapter === 'accounts' ? <Badge count={unpaidCount}>{item.title}</Badge> : item.title;

          return (
            <li key={i} className={cn({ [styles.activeChapter]: isActive })} onClick={() => onNavigate(item.chapter)}>
              {title}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
