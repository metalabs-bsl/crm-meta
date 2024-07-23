import { Options } from 'types/pages';

export const paymentOptions: Options[] = [
  {
    label: 'Наличными, сом',
    value: 'Наличными, сом'
  },
  {
    label: 'Наличными, $',
    value: 'Наличными, $'
  },
  {
    label: 'Наличными, €',
    value: 'Наличными, €'
  },
  {
    label: 'Переводом, сом',
    value: 'Переводом, сом'
  },
  {
    label: 'Переводом, $',
    value: 'Переводом, $'
  },
  {
    label: 'Переводом, €',
    value: 'Переводом, €'
  },
  {
    label: 'Через банк, сом',
    value: 'Через банк, сом'
  },
  {
    label: 'Через банк, $',
    value: 'Через банк, $'
  },
  {
    label: 'Через банк, €',
    value: 'Через банк, €'
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
