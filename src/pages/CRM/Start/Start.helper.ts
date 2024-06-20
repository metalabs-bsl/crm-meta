import conversionIcon from '../../../common/assets/images/conversion.svg';
import dealsIcon from '../../../common/assets/images/deals.svg';
import processedIcon from '../../../common/assets/images/processed.svg';
import soldIcon from '../../../common/assets/images/sold.svg';

export const getSummaryData = (totalDeals: number, processedDeals: number, soldDeals: number, conversion: string) => [
  { icon: dealsIcon, title: 'всего сделок', value: totalDeals.toString() },
  { icon: processedIcon, title: 'обработано сделок', value: processedDeals.toString() },
  { icon: soldIcon, title: 'продано сделок', value: soldDeals.toString() },
  { icon: conversionIcon, title: 'конверсия', value: conversion }
];

export const employeeRowHeaders = [
  'сотрудник',
  'бонусы',
  'доп. бонусы',
  'прибыль',
  'кол-во заявок',
  'сред. чек всех заявок',
  'сред. чек комиссии',
  'кол-во туристов'
];

export const contractRowHeaders = [
  'номер договора',
  'Брутто',
  'Нетто',
  'оплачено',
  'прибыль',
  'доп. бонусы',
  'плательщик',
  'название тура',
  'дата начала тура',
  'PAX'
];
