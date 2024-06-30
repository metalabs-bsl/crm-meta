import { FC, useEffect, useState } from 'react';
import { Button, Loading, SearchInput } from 'common/ui';
import { Tabs } from 'common/components';
import MessageModal from './MessageModal/MessageModal';
import { IMailData } from './types/mailsData';
import { mailTabs as initialMailTabs, mockData } from './Mail.helper';
import { MessageTable } from './MessageTable';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

const columns = ['отправитель', 'сообщение', 'дата'];

export const Mail: FC = () => {
  const [data, setData] = useState<IMailData[]>([]);
  const [filteredData, setFilteredData] = useState<IMailData[]>([]);
  const [activeTab, setActiveTab] = useState<string>(initialMailTabs[0].type);
  const [mailTabs, setMailTabs] = useState(initialMailTabs);

  const [isModalActive, setModalActive] = useState<boolean>(false);

  const handleModalOpen = () => {
    setModalActive(true);
    console.log('show modal');
  };

  useEffect(() => {
    console.log(mockData);
    setData(mockData);
  }, []);

  useEffect(() => {
    let filtered;
    switch (activeTab) {
      case 'inbox':
        filtered = data.filter((mail) => mail.sender !== 'You');
        break;
      case 'unread':
        filtered = data.filter((mail) => mail.unread && mail.sender !== 'You');
        break;
      case 'sent':
        filtered = data.filter((mail) => mail.sender === 'You');
        break;
      default:
        filtered = data;
    }
    setFilteredData(filtered);
  }, [activeTab, data]);

  useEffect(() => {
    const inboxCount = data.filter((mail) => mail.sender !== 'You').length;
    const unreadCount = data.filter((mail) => mail.unread && mail.sender !== 'You').length;
    const sentCount = data.filter((mail) => mail.sender === 'You').length;

    setMailTabs((prevTabs) =>
      prevTabs.map((tab) => {
        switch (tab.type) {
          case 'inbox':
            return { ...tab, badgeCount: inboxCount };
          case 'unread':
            return { ...tab, badgeCount: unreadCount };
          case 'sent':
            return { ...tab, badgeCount: sentCount };
          default:
            return tab;
        }
      })
    );
  }, [data]);

  return (
    <Loading>
      <div className={styles.mail}>
        <div className={styles.headBlock}>
          <div className={styles.titleBlock}>
            <h1>Почта</h1>
            <Button text='написать сообщение' styleType={BUTTON_TYPES.YELLOW} onClick={handleModalOpen} />
          </div>
          <SearchInput placeholder='Поиск' />
        </div>
        <Tabs
          tabItems={mailTabs}
          isActiveTab={activeTab}
          setIsActiveTab={setActiveTab}
          className={styles.tabs}
          tabClassName={styles.tab}
          activeTabClassName={styles.activeTab}
        />
        <div className={styles.tableWrapper}>
          <MessageTable data={filteredData} columns={columns} />
        </div>
      </div>

      {isModalActive && <MessageModal setModalActive={setModalActive} />}
    </Loading>
  );
};
