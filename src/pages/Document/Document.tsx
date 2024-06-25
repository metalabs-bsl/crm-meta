import { useState } from 'react';
import { Button, Loading, SearchInput } from 'common/ui';
import { Tabs } from 'common/components';
import { DocumentTable } from './DocumentTable/DocumentTable';
import { OriginalTable } from './OriginalTable';
// import { Navbar } from 'common/components';
// import { documentChapters } from 'common/constants';
// import { NAVBAR_PAGES } from 'types/enums';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

const data = [
  {
    id: '1234567890',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '1234567890',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '1234567890',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '1234567890',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '1234567890',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '1234567890',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '1234567890',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '1234567890',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '1234567890',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '1234567890',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '1234567890',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '1234567890',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '1234567890',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '1234567890',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  }
];

const originalData = [
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  }
];

const tabItems = [
  { type: 'tab1', title: 'Составленные' },
  { type: 'tab2', title: 'Оригинальные' }
];

export const Document = () => {
  const [activeTab, setActiveTab] = useState(tabItems[0].type);
  return (
    <Loading>
      <div className={styles.document}>
        {/* <Navbar navbarItems={documentChapters} page={NAVBAR_PAGES.DOCUMENT} /> */}
        {/* <Loading /> */}
        <div className={styles.headBlock}>
          <div className={styles.titleBlock}>
            <h1>Документы</h1>
            <Button text='загрузить документ' styleType={BUTTON_TYPES.YELLOW} />
          </div>
          <SearchInput placeholder='Поиск' />
        </div>
        <Tabs
          tabItems={tabItems}
          isActiveTab={activeTab}
          setIsActiveTab={setActiveTab}
          className={styles.customTabsBlock}
          tabClassName={styles.customTab}
          activeTabClassName={styles.customActiveTab}
        />
        <div className={styles.tableWrapper}>
          {activeTab === 'tab1' && <DocumentTable data={data} />}
          {activeTab === 'tab2' && <OriginalTable originalData={originalData} />}
        </div>
      </div>
    </Loading>
  );
};
