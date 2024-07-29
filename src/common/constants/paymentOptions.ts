import { Options } from 'types/pages';

export const paymentOptions: Options[] = [
  {
    label: 'Наличными, сом',
    value: 1
  },
  {
    label: 'Наличными, $',
    value: 2
  },
  {
    label: 'Наличными, €',
    value: 3
  },
  {
    label: 'Переводом, сом',
    value: 4
  },
  {
    label: 'Переводом, $',
    value: 5
  },
  {
    label: 'Переводом, €',
    value: 6
  },
  {
    label: 'Через банк, сом',
    value: 7
  },
  {
    label: 'Через банк, $',
    value: 8
  },
  {
    label: 'Через банк, €',
    value: 9
  }
];

export const currenciesOptions: Options[] = [
  {
    label: 'Доллар, $',
    value: 'usd'
  },
  {
    label: 'Евро, €',
    value: 'eur'
  },
  {
    label: 'Сом, с',
    value: 'som'
  }
];
