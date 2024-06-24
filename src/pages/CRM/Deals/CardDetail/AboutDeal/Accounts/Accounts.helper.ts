export interface Item {
  part: string;
  fileName: string;
  dateTime: string;
  comment: string;
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
        part: 'Первая оплата',
        comment: 'Срок оплаты руководителя 25 июля',
        fileName: 'Счет об оплате первая оплата.jpeg',
        dateTime: '11:11'
      },
      {
        part: 'Вторая оплата',
        comment: 'Срок оплаты руководителя 25 июля',
        fileName: 'Счет об оплате вторая оплата.jpeg',
        dateTime: '11:11'
      }
    ]
  }
];
