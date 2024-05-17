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

export const documentChapters: INavbar = {
  word: { title: 'word', chapter: 'word', allowRoles: [] },
  excel: { title: 'excel', chapter: 'excel', allowRoles: [] },
  powerpoint: { title: 'powerpoint', chapter: 'powerpoint', allowRoles: [] },
  access: { title: 'access', chapter: 'access', allowRoles: [] }
};
