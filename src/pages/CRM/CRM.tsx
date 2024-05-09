import { FC } from 'react';
import { Navbar } from 'common/components';
import { crmChapters } from 'common/constants';
import styles from './styles.module.scss';

import { NAVBAR_PAGES } from 'types/enums';

export const CRM: FC = () => {
  return (
    <div className={styles.crm}>
      <Navbar navbarItems={crmChapters} page={NAVBAR_PAGES.CRM} />
      страница CRM
    </div>
  );
};
