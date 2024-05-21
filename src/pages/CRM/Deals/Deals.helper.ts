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
