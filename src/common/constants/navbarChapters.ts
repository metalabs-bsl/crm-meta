import { ROLES } from 'types/roles';

export interface INavbarItem {
  title: string;
  chapter: string;
  allowRoles: string[];
  isBadge?: boolean;
}

export interface INavbar {
  [key: string]: INavbarItem;
}

export const crmChapters: INavbar = {
  transactions: { title: 'Сделки', chapter: 'transactions', allowRoles: [] },
  accounts: { title: 'Счета', chapter: 'accounts', allowRoles: [] },
  start: { title: 'Старт', chapter: 'start', allowRoles: [] },
  employees: { title: 'Сотрудники', chapter: 'employees', allowRoles: [ROLES.DIRECTOR.role_name, ROLES.SENIOR_MANAGER.role_name] }
};

export const reportChapters: INavbar = {
  profit: { title: 'Прибыль', chapter: 'profit', allowRoles: [] },
  expenses: { title: 'Расходы', chapter: 'expenses', allowRoles: [] },
  excel: { title: 'Другие', chapter: 'others', allowRoles: [] }
};
