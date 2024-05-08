import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { useRedirect } from 'common/hooks';
import { adminPath } from 'types/routes';
import calendarIcon from '../../../assets/icons/sidebar/001-calendar.png';
import mailIcon from '../../../assets/icons/sidebar/002-empty-email.png';
import docsIcon from '../../../assets/icons/sidebar/003-documents.png';
import crmIcon from '../../../assets/icons/sidebar/004-crm.png';
import styles from '../styles.module.scss';

const Chapters = () => {
  const location = useLocation();
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
      action: () => redirect.document({})
    },
    {
      title: 'CRM',
      icon: crmIcon,
      path: adminPath.main,
      action: () => redirect.crm({})
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
        <li key={index} onClick={i.action} className={cn({ [styles.active]: location.pathname === i.path })}>
          <img src={i.icon} alt={i.title} />
          <p>{i.title}</p>
        </li>
      ))}
    </ul>
  );
};

export default Chapters;
