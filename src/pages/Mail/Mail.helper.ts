import { ITabsItem } from 'common/components/Tabs/Tabs.helper';
import { IMailData } from './types/mailsData';

export const mailTabs: ITabsItem[] = [
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

// Mock Data
export const mockData: IMailData[] = [
  { id: 1, sender: 'John Doe', text: 'Hello World', date: '2024-06-05T00:00', unread: true, pick: false, checked: false },
  { id: 2, sender: 'Jane Smith', text: 'React is awesome!', date: '2024-06-04T00:00', unread: false, pick: true, checked: false }
];
