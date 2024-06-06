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

export const KanbanData = [
  { id: 1, text: 'Task 1', status: 'received' },
  { id: 2, text: 'Task 2', status: 'processed' },
  { id: 3, text: 'Task 3', status: 'consideration' }
];

export const kanbanKolumns = [
  { status: 'received', title: 'Поступили', color: 'salat' },
  { status: 'processed', title: 'Взят в обработку', color: 'blue' },
  { status: 'consideration', title: 'Рассмотрение', color: 'dark-green' },
  { status: 'booking', title: 'Бронирование', color: 'violet' },
  { status: 'bought', title: 'Уже купил', color: 'red' },
  { status: 'expensive', title: 'Дорого', color: 'red' },
  { status: 'wrongDates', title: 'Не те даты', color: 'red' },
  { status: 'changeMind', title: 'Передумал', color: 'red' },
  { status: 'noAnswer', title: 'Нет ответа', color: 'red' },
  { status: 'sale', title: 'Продажа', color: 'light-green' }
];

export const TodoData = [
  { id: 1, text: 'Todo 1', status: 'received' },
  { id: 2, text: 'Todo 2', status: 'processed' }
];

export const todoKolumns = [
  { status: 'received', title: 'Информация', color: 'salat' },
  { status: 'processed', title: 'Без дел', color: 'dark-green' },
  { status: 'consideration', title: 'На сегодня', color: 'light-green' },
  { status: 'booking', title: 'На этой неделе', color: 'blue' },
  { status: 'bought', title: 'На следующей неделе', color: 'violet' },
  { status: 'expensive', title: 'Просрочил', color: 'red' }
];
