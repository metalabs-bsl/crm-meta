import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { checkActivePath } from 'common/helpers';
import { useRedirect } from 'common/hooks';
import { crmChapters, documentChapters } from 'common/constants';
import { adminPath } from 'types/routes';
import calendarIcon from '../../../assets/icons/sidebar/001-calendar.png';
import mailIcon from '../../../assets/icons/sidebar/002-empty-email.png';
import docsIcon from '../../../assets/icons/sidebar/003-documents.png';
import crmIcon from '../../../assets/icons/sidebar/004-crm.png';
import styles from '../styles.module.scss';

const Chapters: FC = () => {
  const { pathname } = useLocation();
  const redirect = useRedirect();
  const chapters = [
    {
      title: 'Почта',
      icon: mailIcon,
      path: adminPath.mail,
      action: () => redirect.mail({})
    },
    {
      title: 'Документы',
      icon: docsIcon,
      path: adminPath.document,
      action: () => redirect.document({ chapter: documentChapters.word.chapter })
    },
    {
      title: 'CRM',
      icon: crmIcon,
      path: adminPath.crm,
      action: () => redirect.crm({ chapter: crmChapters.transactions.chapter })
    },
    {
      title: 'Календарь',
      icon: calendarIcon,
      path: adminPath.calendar,
      action: () => redirect.calendar({})
    }
  ];

  return (
    <ul className={styles.chapter}>
      {chapters.map((i, index) => (
        <li key={index} onClick={i.action} className={cn({ [styles.active]: checkActivePath(pathname, i.path) })}>
          <img src={i.icon} alt={i.title} />
          <p>{i.title}</p>
        </li>
      ))}
    </ul>
  );
};

export default Chapters;
