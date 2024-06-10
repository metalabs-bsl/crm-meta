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

export const brandOptions = [
  {
    title: 'Pegasus Asia',
    value: 'pegasus'
  }
];

export const categoryTourTimeOptions = [
  {
    title: 'Горящие',
    value: 'last-minute'
  },
  {
    title: 'На период позже',
    value: 'period-later'
  }
];

export const servicesOptions = [
  {
    title: 'Виза',
    value: 'visa'
  },
  {
    title: 'Страховка',
    value: 'insurance'
  }
];
