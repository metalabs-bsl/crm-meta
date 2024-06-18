import { ROLES } from 'types/roles';

export interface INavbarItem {
  title: string;
  chapter: string;
  allowRoles: string[];
}

export interface INavbar {
  [key: string]: INavbarItem;
}

export const crmChapters: INavbar = {
  transactions: { title: 'Сделки', chapter: 'transactions', allowRoles: [] },
  accounts: { title: 'Счета', chapter: 'accounts', allowRoles: [] },
  start: { title: 'Старт', chapter: 'start', allowRoles: [] },
  employees: { title: 'Сотрудники', chapter: 'employees', allowRoles: [ROLES.ADMIN.role, ROLES.SUPERVISOR.role] }
};

export const reportChapters: INavbar = {
  profit: { title: 'Прибыль', chapter: 'profit', allowRoles: [] },
  expenses: { title: 'Расходы', chapter: 'expenses', allowRoles: [] },
  excel: { title: 'Excel', chapter: 'excel', allowRoles: [] }
};
