import { IIconType } from 'types/common';

export interface TodoItem {
  dedline?: string;
  text: string;
  dateTime?: string;
}

export interface TodoList {
  date: string;
  items: TodoItem[];
}

export type ItemCardType = 'comments' | 'todos';

const todosData: TodoList[] = [
  {
    date: '2024-05-29',
    items: [
      {
        dedline: '9.05.2024, 11:11',
        text: 'Ограничить права прищелцев на планете Пандора.',
        dateTime: '11:11'
      },
      {
        dedline: '9.05.2024, 11:11',
        text: 'Ограничить права прищелцев на планете Марс',
        dateTime: '11:11'
      }
    ]
  },
  {
    date: '2024-05-27',
    items: [
      {
        dedline: '9.05.2024, 11:11',
        text: 'Ограничить права прищелцев на планете Пандора.',
        dateTime: '11:11'
      }
    ]
  }
];

const commentsData: TodoList[] = [
  {
    date: '2024-05-29',
    items: [
      {
        dateTime: '11:11',
        text: 'Пришельцы атакуют!'
      },
      {
        dateTime: '11:11',
        text: 'Пришельцы атакуют!'
      }
    ]
  },
  {
    date: '2024-05-27',
    items: [
      {
        dateTime: '11:11',
        text: 'Пришельцы атакуют!'
      }
    ]
  }
];

interface IDataBlock {
  icon: IIconType;
  blockTitle: string;
  data: TodoList[];
  cardsType: ItemCardType;
}

export const dataBlocks: IDataBlock[] = [
  {
    icon: 'history-todo',
    blockTitle: 'Запланированные дела',
    data: todosData,
    cardsType: 'todos'
  },
  {
    icon: 'history-comment',
    blockTitle: 'Комментарии',
    data: commentsData,
    cardsType: 'comments'
  }
];
