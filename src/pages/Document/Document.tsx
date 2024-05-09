import { FC } from 'react';
import { Navbar } from 'common/components';
import { documentChapters } from 'common/constants';
import styles from './styles.module.scss';

import { NAVBAR_PAGES } from 'types/enums';

export const Document: FC = () => {
  return (
    <div className={styles.document}>
      <Navbar navbarItems={documentChapters} page={NAVBAR_PAGES.DOCUMENT} />
      Document page
    </div>
  );
};
