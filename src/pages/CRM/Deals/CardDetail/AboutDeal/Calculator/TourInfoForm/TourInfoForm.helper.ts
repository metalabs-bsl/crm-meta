import { Options } from 'types/common';

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
  },
  {
    label: 'Pegas Touristik',
    value: 'pegasTouristik'
  },
  {
    label: 'Корпорация Арнесто (JTB)',
    value: 'arnestoCorporation'
  },
  {
    label: 'Corendon ',
    value: 'corendon '
  },
  {
    label: 'Инфотур ',
    value: 'infotour'
  },
  {
    label: 'Хит-Трэвел ',
    value: 'hitTravel'
  },
  {
    label: 'Kazunion Alliance',
    value: 'kazunionAlliance'
  },
  {
    label: 'Easy Booking ',
    value: 'easyBooking '
  },
  {
    label: 'Avia Travel Club ',
    value: 'aviaTravelClub '
  },
  {
    label: 'Travel Emirates (voyager) ',
    value: 'voyager '
  },
  {
    label: 'Селфи Трэвел ',
    value: 'selfieTravel'
  },
  {
    label: 'Best Service ',
    value: 'bestService '
  },
  {
    label: 'CIP',
    value: 'cip'
  },
  {
    label: 'Великолепный век',
    value: 'magnificentCentury'
  },
  {
    label: 'НСК',
    value: 'nsk'
  },
  {
    label: 'ФС Тревел ',
    value: 'fsTravel'
  },
  {
    label: 'Компас',
    value: 'compass'
  },
  {
    label: 'Travel Advisor  ',
    value: 'travelAdvisor  '
  },
  {
    label: 'anex tour',
    value: 'anexTour'
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
