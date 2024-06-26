import { TableRowData } from './types/tableRowData';

export const mainRowHeaders = [
  {
    title: 'номер договора',
    classNames: ['title']
  },
  {
    title: 'номер брони в СТ',
    classNames: ['title']
  },
  {
    title: 'статус оплаты',
    classNames: ['title', 'paymentStatus']
  },
  {
    title: 'Брутто',
    classNames: ['title']
  },
  {
    title: 'Нетто',
    classNames: ['title']
  },
  {
    title: 'курс',
    classNames: ['title']
  },
  {
    title: 'комиссия',
    classNames: ['title']
  },
  {
    title: 'способ оплаты',
    classNames: ['title']
  },
  {
    title: 'направление',
    classNames: ['title']
  },
  {
    title: 'даты тура',
    classNames: ['title']
  },
  {
    title: 'туроператор',
    classNames: ['title']
  },
  {
    title: 'оплата ТО',
    classNames: ['title']
  },
  {
    title: 'кем создан',
    classNames: ['title']
  }
];
export const paymentRowHeaders = [
  {
    title: 'СО клиента',
    classNames: ['title']
  },
  {
    title: 'комментарий',
    classNames: ['title']
  },
  {
    title: 'СО руководителя',
    classNames: ['title']
  },
  {
    title: 'счёт от ТО',
    classNames: ['title']
  },
  {
    title: 'сумма оплаты',
    classNames: ['title']
  },
  {
    title: 'способ оплаты',
    classNames: ['title']
  },
  {
    title: 'квитанция от ТО',
    classNames: ['title']
  },
  {
    title: 'оплата ТО',
    classNames: ['title']
  },
  {
    title: 'счёт от сотрудника',
    classNames: ['title']
  },
  {
    title: 'оплачено',
    classNames: ['title']
  }
];

export const indexToBookingNumberForDeleteModal = (selectedArr: number[], dataArr: TableRowData[]) => {
  if (selectedArr.length === 1) {
    return `Вы уверены, что хотите удалить счёт c номером договора: ${dataArr[selectedArr[0]].bookingNumber}?`;
  } else {
    return `Вы уверены, что хотите удалить счета c номерами договоров: ${selectedArr.map((idx) => dataArr[idx].bookingNumber).join(', ')}?`;
  }
};
