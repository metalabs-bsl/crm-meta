import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from 'common/components';
import { crmChapters } from 'common/constants';
import styles from './styles.module.scss';

import { NAVBAR_PAGES } from 'types/enums';

export const CRM: FC = () => {
  const { chapter } = useParams<{ chapter: string }>();
  if (!chapter) return null;
  return (
    <div className={styles.crm}>
      <Navbar navbarItems={crmChapters} page={NAVBAR_PAGES.CRM} />
      <p>{crmChapters[chapter].title}</p>
      <p>{crmChapters[chapter].chapter}</p>
    </div>
  );
};
