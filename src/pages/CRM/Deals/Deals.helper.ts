export enum DEALS_TABS {
  kanban = 'kanban',
  list = 'list',
  todos = 'todos'
}

export interface IMainTabs {
  title: string;
  type: DEALS_TABS;
}

export const mainTabs: IMainTabs[] = [
  {
    title: 'Канбан',
    type: DEALS_TABS.kanban
  },
  {
    title: 'Список',
    type: DEALS_TABS.list
  },
  {
    title: 'Дела',
    type: DEALS_TABS.todos
  }
];

export interface Task {
  id: number;
  text: string;
  status: string;
  brutto: string;
  date: string;
  comment: string;
  todoCount: number;
  user: {
    name: string;
    phone: string;
    birthday: string;
    city: string;
    source: string;
  };
}

export interface IColumn {
  status: string;
  title: string;
  color: string;
  cards: Task[];
}

export const kanbanKolumns: IColumn[] = [
  {
    status: 'received',
    title: 'Поступили',
    color: 'salat',
    cards: [
      {
        id: 1,
        text: 'Task 1',
        status: 'received',
        brutto: '1200$',
        date: '2024-05-08T00:00',
        comment: 'Прищельцы атакуют!',
        todoCount: 0,
        user: {
          name: 'Азат',
          phone: '+996704135830',
          birthday: '1997-05-16T00:00',
          city: 'Бишкек',
          source: 'Написал в WhatsApp'
        }
      },
      {
        id: 2,
        text: 'Task 2',
        status: 'received',
        brutto: '1500$',
        date: '2024-05-09T00:00',
        comment: 'Люди атакуют!',
        todoCount: 1,
        user: {
          name: 'Айдин',
          phone: '+996552220790',
          birthday: '2004-02-12T00:00',
          city: 'Бишкек',
          source: 'Написал в WhatsApp'
        }
      }
    ]
  },
  {
    status: 'processed',
    title: 'Взят в обработку',
    color: 'blue',
    cards: [
      {
        id: 3,
        text: 'Task 3',
        status: 'processed',
        brutto: '2500$',
        date: '2024-02-09T00:00',
        comment: 'Люди проиграли!',
        todoCount: 2,
        user: {
          name: 'Милана',
          phone: '+996507500858',
          birthday: '2004-05-18T00:00',
          city: 'Бишкек',
          source: 'Написал в WhatsApp'
        }
      },
      {
        id: 4,
        text: 'Task 4',
        status: 'processed',
        brutto: '2500$',
        date: '2022-02-09T00:00',
        comment: 'Люди выиграли!',
        todoCount: 3,
        user: {
          name: 'Тариэл',
          phone: '+996704135830',
          birthday: '2001-03-31T00:00',
          city: 'Бишкек',
          source: 'Написал в WhatsApp'
        }
      }
    ]
  },
  { status: 'consideration', title: 'Рассмотрение', color: 'dark-green', cards: [] },
  { status: 'booking', title: 'Бронирование', color: 'violet', cards: [] },
  { status: 'bought', title: 'Уже купил', color: 'red', cards: [] },
  { status: 'expensive', title: 'Дорого', color: 'red', cards: [] },
  { status: 'wrongDates', title: 'Не те даты', color: 'red', cards: [] },
  { status: 'changeMind', title: 'Передумал', color: 'red', cards: [] },
  { status: 'noAnswer', title: 'Нет ответа', color: 'red', cards: [] },
  { status: 'sale', title: 'Продажа', color: 'light-green', cards: [] }
];

export const todoKolumns: IColumn[] = [
  { status: 'received', title: 'Информация', color: 'salat', cards: [] },
  {
    status: 'processed',
    title: 'Без дел',
    color: 'dark-green',
    cards: [
      {
        id: 1,
        text: 'Task 1',
        status: 'received',
        brutto: '1200$',
        date: '2024-05-08T00:00',
        comment: 'Прищельцы атакуют!',
        todoCount: 0,
        user: {
          name: 'Азат',
          phone: '+996704135830',
          birthday: '1997-05-16T00:00',
          city: 'Бишкек',
          source: 'Написал в WhatsApp'
        }
      },
      {
        id: 2,
        text: 'Task 2',
        status: 'received',
        brutto: '1500$',
        date: '2024-05-09T00:00',
        comment: 'Люди атакуют!',
        todoCount: 1,
        user: {
          name: 'Айдин',
          phone: '+996552220790',
          birthday: '2004-02-12T00:00',
          city: 'Бишкек',
          source: 'Написал в WhatsApp'
        }
      }
    ]
  },
  { status: 'consideration', title: 'На сегодня', color: 'light-green', cards: [] },
  { status: 'booking', title: 'На этой неделе', color: 'blue', cards: [] },
  { status: 'bought', title: 'На следующей неделе', color: 'violet', cards: [] },
  { status: 'expensive', title: 'Просрочил', color: 'red', cards: [] }
];
