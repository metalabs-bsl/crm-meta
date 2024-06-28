import { FC, useState } from 'react';
// import { Icon } from 'common/ui';
import { Button, Loading, SearchInput } from 'common/ui';
import { Tabs } from 'common/components';
import { ITabsItem } from 'common/components/Tabs/Tabs.helper';
import MessageModal from './MessageModal/MessageModal';
import { MessageTable } from './MessageTable';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

const mailTabs: ITabsItem[] = [
  {
    title: 'Входящие',
    type: 'inbox',
    badgeCount: 1,
    hasBadge: true
  },
  {
    title: 'Непрочитанные',
    type: 'unread',
    badgeCount: 2,
    hasBadge: true
  },
  {
    title: 'Отправленные',
    type: 'sent',
    badgeCount: 0,
    hasBadge: true
  }
];

const messages = [
  { id: 1, sender: 'John Doe', text: 'Hello World', date: '2024-06-05T00:00', unread: true, pick: false, checked: false },
  { id: 2, sender: 'Jane Smith', text: 'React is awesome!', date: '2024-06-04T00:00', unread: false, pick: true, checked: false }
];

const columns = ['отправитель', 'сообщение', 'дата'];

export const Mail: FC = () => {
  const [activeTab, setActiveTab] = useState<string>(mailTabs[0].type);
  const [isModalActive, setModalActive] = useState<boolean>(false);

  const handleModalOpen = () => {
    setModalActive(true);
    console.log('show modal');
  };

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
          <MessageTable messages={messages} columns={columns} />
        </div>
      </div>

      {isModalActive && <MessageModal setModalActive={setModalActive} />}
    </Loading>
  );
};
