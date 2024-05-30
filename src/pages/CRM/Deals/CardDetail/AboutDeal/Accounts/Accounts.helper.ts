export interface Item {
  part: string;
  fileName: string;
  dateTime: string;
}

export interface AccountList {
  date: string;
  items: Item[];
}

export const accountsData: AccountList[] = [
  {
    date: '2024-05-29',
    items: [
      {
        part: 'Первая часть',
        fileName: 'Счет об оплате первая часть.jpeg',
        dateTime: '11:11'
      },
      {
        part: 'Вторая часть',
        fileName: 'Счет об оплате вторая часть.jpeg',
        dateTime: '11:11'
      }
    ]
  }
];
