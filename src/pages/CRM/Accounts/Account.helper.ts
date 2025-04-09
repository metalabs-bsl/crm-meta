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
    title: 'комиссия',
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
    title: 'оплата ТО, сом',
    classNames: ['title']
  },
  {
    title: 'оплата ТО, доллар',
    classNames: ['title']
  },
  {
    title: 'оплата ТО, евро',
    classNames: ['title']
  },
  {
    title: 'кем создан',
    classNames: ['title']
  }
];
export const paymentRowHeaders = [
  {
    title: 'оплачено',
    classNames: ['title']
  },
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
    title: 'курс',
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
    title: 'валюта',
    classNames: ['title']
  }
];

export const formatDate = (date: string) => {
  const formatDate = [date.slice(0, 10).split('-').reverse().join('.'), date.slice(11).split('-').reverse().join('.')];
  return `${formatDate[0]}- ${formatDate[1]}`;
};
