import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Icon } from 'common/ui';
import { checkActivePath } from 'common/helpers';
import { useRedirect } from 'common/hooks';
import { crmChapters, documentChapters } from 'common/constants';
import { IIconType } from 'types/common';
import { adminPath } from 'types/routes';
import styles from '../styles.module.scss';

const Chapters: FC = () => {
  const { pathname } = useLocation();
  const redirect = useRedirect();
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
      action: () => redirect.document({ chapter: documentChapters.word.chapter })
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
      action: () => redirect.report({})
    }
  ];

  return (
    <ul className={styles.chapter}>
      {chapters.map((i, index) => {
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
