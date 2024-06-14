import { Birthday, Note } from 'types/pages';

export const birthdays: Birthday[] = [
  { name: 'Азатов Азат', date: '2024-06-14T00:00', phone: '+996500500500' },
  { name: 'Таиров Тариэл', date: '2024-06-16T00:00', phone: '+996704135830' }
];

export const notes: Note[] = [
  {
    title: 'Общее собрание',
    geolocation: 'Офис на Киевская',
    date: '2024-06-05T12:00',
    reminder: [
      { label: 'За 15 минут', value: '3' },
      { label: 'За день', value: '7' },
      { label: 'За неделю', value: '9' }
    ],
    user: 'Азатов Азат'
  },
  {
    title: 'Dayli',
    geolocation: 'Офис на Киевская',
    date: '2024-06-07T12:00',
    reminder: [
      { label: 'За 15 минут', value: '3' },
      { label: 'За день', value: '7' },
      { label: 'За неделю', value: '9' }
    ],
    user: 'Таиров Тариэл'
  }
];
