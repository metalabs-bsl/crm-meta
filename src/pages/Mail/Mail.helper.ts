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
  {
    id: 1,
    sender: 'John Doe',
    theme: 'Я так понимаю это заголовок темы письма',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum nulla sit amet nisi fringilla porta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nulla ipsum, ullamcorper eu egestas vel, sollicitudin sit amet augue. Nam molestie leo eu pretium rhoncus. Nulla at metus pellentesque, feugiat turpis id, placerat massa. Ut id porta neque, ut lobortis augue. Donec suscipit, nisl quis ultricies hendrerit, augue lectus vestibulum lacus, ac aliquam velit tortor sed orci. In hac habitasse platea dictumst. Aliquam luctus nisi vitae posuere venenatis. Integer tristique quam eget est maximus vulputate. Vestibulum egestas nisi lectus, nec rutrum ex congue id.',
    mailChain: [
      {
        image: 'https://cdn.pixabay.com/photo/2021/11/19/20/20/man-6810238_960_720.jpg',
        name: 'Азатов Азат Азатович',
        email: 'azatovaza@gmail.com',
        date: 'ср, 5 июня 2024, 18:30',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum nulla sit amet nisi fringilla porta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nulla ipsum, ullamcorper eu egestas vel, sollicitudin sit amet augue. Nam molestie leo eu pretium rhoncus. Nulla at metus pellentesque, feugiat turpis id, placerat massa. Ut id porta neque, ut lobortis augue. Donec suscipit, nisl quis ultricies hendrerit, augue lectus vestibulum lacus, ac aliquam velit tortor sed orci. In hac habitasse platea dictumst. Aliquam luctus nisi vitae posuere venenatis. Integer tristique quam eget est maximus vulputate. Vestibulum egestas nisi lectus, nec rutrum ex congue id.'
      },
      {
        image: 'https://photocasa.ru/uploads/posts/2016-06/1465055358_img_3794-1.jpg',
        name: 'Апсаматова Аки',
        email: 'apsamatovaaki@gmail.com',
        date: 'ср, 5 июня 2024, 20:30',
        text: 'Aliquam eget nunc pretium',
        reply:
          'ultrices turpis non, iaculis nunc. Morbi fringilla ex eget metus venenatis scelerisque. Donec purus massa, gravida non dignissim eget, pharetra et lorem. Morbi in aliquet mi. Mauris semper tempus dui, sit amet rutrum leo posuere vitae. Proin ultrices nisl sit amet posuere elementum. Nullam gravida fermentum mollis. Ut bibendum neque euismod libero venenatis fermentum. Aliquam non bibendum nibh. Aliquam bibendum feugiat ex, vitae faucibus sem sodales ac. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec leo sapien, faucibus sed nulla ut, blandit tempor sem. Nulla congue nisl at dapibus tincidunt. Pellentesque.'
      }
    ],
    date: '2024-06-05T00:00',
    unread: true,
    pick: false,
    checked: false
  },
  {
    id: 2,
    sender: 'Jane Smith',
    theme: 'Я так понимаю это заголовок темы письма',
    text: 'Aliquam eget nunc pretium, ultrices turpis non, iaculis nunc. Morbi fringilla ex eget metus venenatis scelerisque. Donec purus massa, gravida non dignissim eget, pharetra et lorem. Morbi in aliquet mi. Mauris semper tempus dui, sit amet rutrum leo posuere vitae. Proin ultrices nisl sit amet posuere elementum. Nullam gravida fermentum mollis. Ut bibendum neque euismod libero venenatis fermentum. Aliquam non bibendum nibh. Aliquam bibendum feugiat ex, vitae faucibus sem sodales ac. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec leo sapien, faucibus sed nulla ut, blandit tempor sem. Nulla congue nisl at dapibus tincidunt. Pellentesque.',
    mailChain: [
      {
        image: 'https://cdn.pixabay.com/photo/2021/11/19/20/20/man-6810238_960_720.jpg',
        name: 'Jane Smith',
        email: 'azatovaza@gmail.com',
        date: 'ср, 5 июня 2024, 20:30',
        text: 'Aliquam eget nunc pretium, ultrices turpis non, iaculis nunc. Morbi fringilla ex eget metus venenatis scelerisque. Donec purus massa, gravida non dignissim eget, pharetra et lorem. Morbi in aliquet mi. Mauris semper tempus dui, sit amet rutrum leo posuere vitae. Proin ultrices nisl sit amet posuere elementum. Nullam gravida fermentum mollis. Ut bibendum neque euismod libero venenatis fermentum. Aliquam non bibendum nibh. Aliquam bibendum feugiat ex, vitae faucibus sem sodales ac. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec leo sapien, faucibus sed nulla ut, blandit tempor sem. Nulla congue nisl at dapibus tincidunt. Pellentesque.'
      }
    ],
    date: '2024-06-04T00:00',
    unread: false,
    pick: true,
    checked: false
  }
];
