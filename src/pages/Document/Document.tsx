import { useState } from 'react';
import { Button, Loading, SearchInput } from 'common/ui';
import { Modal, Tabs } from 'common/components';
import { DocumentForm } from './DocumentForm/DocumentForm';
import { DocumentTable } from './DocumentTable/DocumentTable';
import { OriginalTable } from './OriginalTable';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export interface DocumentData {
  id: string;
  name: string;
  title: string;
  file: string;
}

const data: DocumentData[] = [
  {
    id: '12345',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '123456780',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '12',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '1231123',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '75856',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '3456',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '89070',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '578567856',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '334523',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '4567456',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '45674547',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '567856875678',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '3213412',
    name: 'Азатов Азат Азатович',
    title: 'Предпоследний Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '120934',
    name: 'Азатов Азат Азатович',
    title: 'Последний Договор на случай если пришельцы решат напасть',
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
    title: 'Предпоследний Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Последний Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  }
];

const tabItems = [
  { type: 'tab1', title: 'Составленные' },
  { type: 'tab2', title: 'Оригинальные' }
];

export const Document = () => {
  const [activeTab, setActiveTab] = useState(tabItems[0].type);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  type TabComponents = {
    [key in (typeof tabItems)[number]['type']]: React.ReactNode;
  };

  const getTableComponent = (tab: (typeof tabItems)[number]['type']): React.ReactNode => {
    const components: TabComponents = {
      tab1: <DocumentTable data={data} />,
      tab2: <OriginalTable originalData={originalData} />
    };
    return components[tab];
  };

  return (
    <Loading>
      <div className={styles.document}>
        <div className={styles.headBlock}>
          <div className={styles.titleBlock}>
            <h1>Документы</h1>
            <Button text='загрузить документ' styleType={BUTTON_TYPES.YELLOW} onClick={() => setIsModalOpen(true)} />
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
        <div className={styles.tableWrapper}>{getTableComponent(activeTab)}</div>
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <DocumentForm onClose={handleModalClose} activeTab={activeTab} />
        </Modal>
      </div>
    </Loading>
  );
};
