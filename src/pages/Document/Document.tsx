import { useEffect, useState } from 'react';
import { Button, Loading, SearchInput } from 'common/ui';
import { Modal, Tabs } from 'common/components';
import { useLazyGetDocsQuery } from 'api/admin/document/document.api';
import { DocumentForm } from './DocumentForm/DocumentForm';
import { DocumentTable } from './DocumentTable/DocumentTable';
import { OriginalTable } from './OriginalTable';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

const tabItems = [
  { type: 'tab1', title: 'Составленные' },
  { type: 'tab2', title: 'Оригинальные' }
];

export const Document = () => {
  const [activeTab, setActiveTab] = useState(tabItems[0].type);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getDocuments, { isFetching, data }] = useLazyGetDocsQuery();
  const [search, setSearch] = useState<string>('');

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getDocuments({ search, isOriginal: activeTab === 'tab2' });
  }, [activeTab, getDocuments, search]);

  type TabComponents = {
    [key in (typeof tabItems)[number]['type']]: React.ReactNode;
  };

  const getTableComponent = (tab: (typeof tabItems)[number]['type']): React.ReactNode => {
    const components: TabComponents = {
      tab1: <DocumentTable data={data} />,
      tab2: <OriginalTable originalData={data} />
    };
    return components[tab];
  };

  return (
    <Loading isSpin={isFetching}>
      <div className={styles.document}>
        <div className={styles.headBlock}>
          <div className={styles.titleBlock}>
            <h1>Документы</h1>
            <Button text='загрузить документ' styleType={BUTTON_TYPES.YELLOW} onClick={() => setIsModalOpen(true)} />
          </div>
          <SearchInput placeholder='Поиск' onValueChange={setSearch} />
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
