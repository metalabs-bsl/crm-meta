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
  { status: 'received', title: 'Поступили' },
  { status: 'processed', title: 'Взят в обработку' },
  { status: 'consideration', title: 'Рассмотрение' },
  { status: 'booking', title: 'Бронирование' },
  { status: 'bought', title: 'Уже купил' },
  { status: 'expensive', title: 'Дорого' },
  { status: 'wrongDates', title: 'Не те даты' },
  { status: 'changeMind', title: 'Передумал' },
  { status: 'noAnswer', title: 'Нет ответа' },
  { status: 'sale', title: 'Продажа' }
];

export const TodoData = [
  { id: 1, text: 'Todo 1', status: 'received' },
  { id: 2, text: 'Todo 2', status: 'processed' }
];

export const todoKolumns = [
  { status: 'received', title: 'Информация' },
  { status: 'processed', title: 'Без дел' },
  { status: 'consideration', title: 'На сегодня' },
  { status: 'booking', title: 'На этой неделе' },
  { status: 'bought', title: 'На следующей неделе' },
  { status: 'expensive', title: 'Просрочил' }
];
