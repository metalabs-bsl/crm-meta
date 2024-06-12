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
}

export interface IColumn {
  status: string;
  title: string;
  color: string;
  cards: Task[];
}

export const kanbanKolumns: IColumn[] = [
  { status: 'received', title: 'Поступили', color: 'salat', cards: [{ id: 1, text: 'Task 1', status: 'received' }] },
  { status: 'processed', title: 'Взят в обработку', color: 'blue', cards: [{ id: 2, text: 'Task 2', status: 'processed' }] },
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
  { status: 'processed', title: 'Без дел', color: 'dark-green', cards: [] },
  { status: 'consideration', title: 'На сегодня', color: 'light-green', cards: [] },
  { status: 'booking', title: 'На этой неделе', color: 'blue', cards: [] },
  { status: 'bought', title: 'На следующей неделе', color: 'violet', cards: [] },
  { status: 'expensive', title: 'Просрочил', color: 'red', cards: [] }
];
