import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from 'common/components';
import { reportChapters } from 'common/constants';
import { Expenses } from './Expenses';
import { Others } from './Others';
import { Profit } from './Profit';
import styles from './styles.module.scss';

import { NAVBAR_PAGES } from 'types/enums';

export const Report: FC = () => {
  const { chapter } = useParams<{ chapter: string }>();
  if (!chapter) return null;

  const getComponent = (chapter: string) => {
    const components = {
      [reportChapters.profit.chapter]: <Profit />,
      [reportChapters.expenses.chapter]: <Expenses />,
      [reportChapters.excel.chapter]: <Others />
    };
    return components[chapter];
  };

  return (
    <div className={styles.report}>
      <Navbar navbarItems={reportChapters} page={NAVBAR_PAGES.REPORT} />
      <div className={styles.pageContainer}>{getComponent(chapter)}</div>
    </div>
  );
};
