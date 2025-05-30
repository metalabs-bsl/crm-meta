import { FC, useEffect, useMemo, useState } from 'react';
import { Button, SearchInput } from 'common/ui';
import { Tabs } from 'common/components';
import { ITabsItem } from 'common/components/Tabs/Tabs.helper';
import { useGetMailCountsOfTabsQuery, useLazyGetMailQuery, useRefreshMailMutation } from 'api/admin/mail/mail.api';
import MessageModal from './MessageModal/MessageModal';
import { MessageTable } from './MessageTable';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

enum TABS_VALUES {
  INBOX = 'inbox',
  UNREAD = 'unread',
  SENT = 'sent'
}

export const Mail: FC = () => {
  const [activeTab, setActiveTab] = useState<string>(TABS_VALUES.INBOX);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isModalActive, setModalActive] = useState<boolean>(false);

  const [getMail, { data: mailData, isFetching: isMailFetching }] = useLazyGetMailQuery();
  const [refreshMail, { isLoading: isRefreshLoading }] = useRefreshMailMutation();
  const { data: tabsData } = useGetMailCountsOfTabsQuery();

  useEffect(() => {
    getMail({ type: activeTab, search: searchValue });
  }, [activeTab, getMail, searchValue]);

  const buildTabsData = useMemo<ITabsItem[]>(() => {
    if (!tabsData) return [];
    return [
      {
        title: 'Входящие',
        type: TABS_VALUES.INBOX,
        badgeCount: tabsData.inboxCount,
        hasBadge: tabsData.inboxCount > 0
      },
      {
        title: 'Непрочитанные',
        type: TABS_VALUES.UNREAD,
        badgeCount: tabsData.unreadCount,
        hasBadge: tabsData.unreadCount > 0
      },
      {
        title: 'Отправленные',
        type: TABS_VALUES.SENT,
        badgeCount: tabsData.sentCount,
        hasBadge: tabsData.sentCount > 0
      }
    ];
  }, [tabsData]);

  const columns = useMemo(() => {
    if (activeTab === TABS_VALUES.SENT) {
      return ['получатель', 'сообщение', 'дата'];
    }
    return ['отправитель', 'сообщение', 'дата'];
  }, [activeTab]);

  return (
    <div className={styles.mail}>
      <div className={styles.headBlock}>
        <div className={styles.titleBlock}>
          <h1>Почта</h1>
          <Button text='написать сообщение' styleType={BUTTON_TYPES.YELLOW} onClick={() => setModalActive(true)} />
        </div>
        <SearchInput placeholder='Поиск' onValueChange={setSearchValue} />
      </div>
      <div className={styles.refresh}>
        <Tabs
          tabItems={buildTabsData}
          isActiveTab={activeTab}
          setIsActiveTab={setActiveTab}
          className={styles.tabs}
          tabClassName={styles.tab}
          activeTabClassName={styles.activeTab}
        />
        <Button text='обновить' styleType={BUTTON_TYPES.YELLOW} onClick={() => refreshMail()} />
      </div>
      <div className={styles.tableWrapper}>
        <MessageTable data={mailData} columns={columns} isLoading={isMailFetching || isRefreshLoading} />
      </div>
      {isModalActive && <MessageModal isModalActive={isModalActive} setModalActive={setModalActive} />}
    </div>
  );
};
