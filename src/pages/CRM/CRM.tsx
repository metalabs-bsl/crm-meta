import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from 'common/components';
import { crmChapters } from 'common/constants';
import { Accounts } from './Accounts';
import { Deals } from './Deals';
import { Employees } from './Employees';
import { Start } from './Start';
import styles from './styles.module.scss';

import { NAVBAR_PAGES } from 'types/enums';

export const CRM: FC = () => {
  const { chapter } = useParams<{ chapter: string }>();
  if (!chapter) return null;

  const getComponent = (chapter: string) => {
    const components = {
      [crmChapters.transactions.chapter]: <Deals />,
      [crmChapters.accounts.chapter]: <Accounts />,
      [crmChapters.start.chapter]: <Start />,
      [crmChapters.employees.chapter]: <Employees columns={[]} dataColumns={[]} />
    };
    return components[chapter];
  };

  return (
    <div className={styles.crm}>
      <Navbar navbarItems={crmChapters} page={NAVBAR_PAGES.CRM} />
      <div className={styles.pageContainer}>{getComponent(chapter)}</div>
    </div>
  );
};
