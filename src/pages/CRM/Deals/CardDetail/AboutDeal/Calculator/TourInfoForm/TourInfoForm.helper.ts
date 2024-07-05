import { Options } from 'types/pages';

export interface PassengerCounts {
  adults: number;
  children: number;
}

export interface PassengerType {
  type: string;
  text: string;
  stateKey: 'adults' | 'children';
}

export const passengerTypes: PassengerType[] = [
  { type: 'Взрослые', text: '12 лет и старше', stateKey: 'adults' },
  { type: 'Ребенок', text: 'с рождения до 11 лет', stateKey: 'children' }
];

export const brandOptions: Options[] = [
  {
    label: 'Pegasus Asia',
    value: 'pegasus'
  }
];

export const categoryTourTimeOptions: Options[] = [
  {
    label: 'Горящие',
    value: 'last-minute'
  },
  {
    label: 'На период позже',
    value: 'period-later'
  }
];

export const servicesOptions: Options[] = [
  {
    label: 'Не выбрано',
    value: ''
  },
  {
    label: 'Виза',
    value: 'visa'
  },
  {
    label: 'Страховка',
    value: 'insurance'
  }
];
