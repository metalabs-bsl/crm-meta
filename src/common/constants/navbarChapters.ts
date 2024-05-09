export interface INavbarItem {
  title: string;
  chapter: string;
}

export interface INavbar {
  [key: string]: INavbarItem;
}

export const crmChapters: INavbar = {
  transactions: { title: 'Сделки', chapter: 'transactions' },
  accounts: { title: 'Счета', chapter: 'accounts' },
  start: { title: 'Старт', chapter: 'start' },
  employees: { title: 'Сотрудники', chapter: 'employees' }
};

export const documentChapters: INavbar = {
  word: { title: 'word', chapter: 'word' },
  excel: { title: 'excel', chapter: 'excel' },
  powerpoint: { title: 'powerpoint', chapter: 'powerpoint' },
  access: { title: 'access', chapter: 'access' }
};
