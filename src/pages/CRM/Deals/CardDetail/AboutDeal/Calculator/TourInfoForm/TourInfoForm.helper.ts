import { Options } from 'types/common';

export interface PassengerCounts {
  adults: number;
  children: number;
  children_old: number;
}

export interface PassengerType {
  type: string;
  text: string;
  stateKey: 'adults' | 'children_old' | 'children';
}

export const passengerTypes: PassengerType[] = [
  { type: 'Взрослые', text: '12 лет и старше', stateKey: 'adults' },
  { type: 'Ребенок', text: 'с 3 до 11 лет', stateKey: 'children_old' },
  { type: 'Ребенок', text: 'с рождения до 3 лет', stateKey: 'children' }
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
