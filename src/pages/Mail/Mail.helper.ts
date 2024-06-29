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
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum nulla sit amet nisi fringilla porta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nulla ipsum, ullamcorper eu egestas vel, sollicitudin sit amet augue. Nam molestie leo eu pretium rhoncus. Nulla at metus pellentesque, feugiat turpis id, placerat massa. Ut id porta neque, ut lobortis augue.\nС уважением Абдулла и команда Хакуна Матата',
    mailChain: [
      {
        image: 'https://cdn.pixabay.com/photo/2021/11/19/20/20/man-6810238_960_720.jpg',
        name: 'Азатов Азат Азатович',
        email: 'azatovaza@gmail.com',
        date: 'ср, 5 июня 2024, 18:30',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum nulla sit amet nisi fringilla porta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nulla ipsum, ullamcorper eu egestas vel, sollicitudin sit amet augue. Nam molestie leo eu pretium rhoncus. Nulla at metus pellentesque, feugiat turpis id, placerat massa. Ut id porta neque, ut lobortis augue.\n \nС уважением Абдулла и команда Хакуна Матата'
      },
      {
        image: 'https://photocasa.ru/uploads/posts/2016-06/1465055358_img_3794-1.jpg',
        name: 'Апсаматова Аки',
        email: 'apsamatovaaki@gmail.com',
        date: 'ср, 5 июня 2024, 20:30',
        text: 'Aliquam eget nunc pretium',
        reply: {
          image: 'https://cdn.pixabay.com/photo/2021/11/19/20/20/man-6810238_960_720.jpg',
          name: 'Азатов Азат Азатович',
          email: 'azatovaza@gmail.com',
          date: 'ср, 5 июня 2024, 18:30',
          text: 'ultrices turpis non, iaculis nunc. Morbi fringilla ex eget metus venenatis scelerisque. Donec purus massa, gravida non dignissim eget, pharetra et lorem. Morbi in aliquet mi. Mauris semper tempus dui, sit amet rutrum leo posuere vitae. Proin ultrices nisl sit amet posuere elementum. Nullam gravida fermentum mollis. Ut bibendum neque euismod libero venenatis fermentum. Aliquam non bibendum nibh. Aliquam bibendum feugiat ex, vitae faucibus sem sodales ac. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec leo sapien, faucibus sed nulla ut, blandit tempor sem. Nulla congue nisl at dapibus tincidunt. Pellentesque.'
        }
      }
    ],
    date: '2024-06-05T00:00',
    unread: true,
    pick: false,
    checked: false
  },
  {
    id: 2,
    sender: 'Aane Smith',
    theme: 'Пришельцы решили действовать!',
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
  },
  {
    id: 3,
    sender: 'Sam Smith',
    theme: 'Пришельцы решили действовать!',
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
    pick: false,
    checked: false
  },
  {
    id: 4,
    sender: 'Lora Smith',
    theme: 'Пришельцы решили действовать!',
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
  },
  {
    id: 5,
    sender: 'Hanna Smith',
    theme: 'Пришельцы решили действовать!',
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
  },
  {
    id: 6,
    sender: 'Tom Smith',
    theme: 'Пришельцы решили действовать!',
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
  },
  {
    id: 7,
    sender: 'Sam Smith',
    theme: 'Пришельцы решили действовать!',
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
    pick: false,
    checked: false
  },
  {
    id: 8,
    sender: 'Lora Smith',
    theme: 'Пришельцы решили действовать!',
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
  },
  {
    id: 9,
    sender: 'Hanna Smith',
    theme: 'Пришельцы решили действовать!',
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
  },
  {
    id: 10,
    sender: 'Tom Smith',
    theme: 'Пришельцы решили действовать!',
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
  },
  {
    id: 11,
    sender: 'Tom Smith',
    theme: 'Пришельцы решили действовать!',
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

export const userMailData = {
  image: 'https://photocasa.ru/uploads/posts/2016-06/1465055358_img_3794-1.jpg',
  name: 'Апсаматова Аки',
  email: 'apsamatovaaki@gmail.com'
};
