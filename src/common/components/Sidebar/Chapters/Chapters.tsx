import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Icon } from 'common/ui';
import { checkActivePath } from 'common/helpers';
import { useAppSelector, useRedirect } from 'common/hooks';
import { crmChapters, reportChapters } from 'common/constants';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import { IIconType } from 'types/common';
import { adminPath } from 'types/routes';
import styles from '../styles.module.scss';

const Chapters: FC = () => {
  const { pathname } = useLocation();
  const redirect = useRedirect();
  const { role } = useAppSelector(employeesSelectors.employees);

  useEffect(() => {
    console.log(role);
  }, []);

  const chapters = [
    {
      title: 'CRM',
      icon: 'crm',
      path: adminPath.crm,
      action: () => redirect.crm({ chapter: crmChapters.transactions.chapter })
    },
    {
      title: 'Календарь',
      icon: 'calendar',
      path: adminPath.calendar,
      action: () => redirect.calendar({})
    },
    {
      title: 'Документы',
      icon: 'document',
      path: adminPath.document,
      action: () => redirect.document({})
    },
    {
      title: 'Почта',
      icon: 'mail',
      path: adminPath.mail,
      action: () => redirect.mail({})
    },
    {
      title: 'Отчеты',
      icon: 'report',
      path: adminPath.report,
      action: () => redirect.report({ chapter: reportChapters.profit.chapter })
    },
    {
      title: 'Настройки',
      icon: 'settings',
      path: adminPath.settings,
      action: () => redirect.settings({})
    }
  ];

  return (
    <ul className={styles.chapter}>
      {chapters
        .filter((chapter) => {
          return !(
            (chapter.title === 'Настройки' && (role === 'Manager' || role === 'Intern')) ||
            (chapter.title === 'Отчеты' && (role === 'Manager' || role === 'Intern'))
          );
        })
        .map((i, index) => {
          const isActive = checkActivePath(pathname, i.path);
          return (
            <li key={index} onClick={i.action} className={cn({ [styles.active]: isActive })}>
              <Icon type={(isActive ? i.icon + '-dark' : i.icon) as IIconType} alt={i.icon} />
              <p>{i.title}</p>
            </li>
          );
        })}
    </ul>
  );
};

export default Chapters;
