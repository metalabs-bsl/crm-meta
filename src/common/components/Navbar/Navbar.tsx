import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { useRedirect } from 'common/hooks';
import { INavbar } from 'common/constants';
import styles from './styles.module.scss';

type Page = 'crm' | 'document';

interface IProps {
  navbarItems: INavbar;
  page: Page;
}

export const Navbar: FC<IProps> = ({ navbarItems, page }) => {
  const redirectTo = useRedirect();
  const { pathname } = useLocation();

  const onNavigate = (chapter: string) => {
    if (page === 'crm' || page === 'document') redirectTo[page]({ chapter });
  };

  return (
    <ul className={styles.navBar}>
      {Object.values(navbarItems).map((item, index) => (
        <li
          className={cn({ [styles.activeChapter]: pathname.includes(item.chapter) })}
          key={index}
          onClick={() => onNavigate(item.chapter)}
        >
          {item.title}
        </li>
      ))}
    </ul>
  );
};
