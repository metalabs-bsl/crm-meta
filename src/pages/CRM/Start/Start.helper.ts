import conversionIcon from '../../../common/assets/images/conversion.svg';
import dealsIcon from '../../../common/assets/images/deals.svg';
import processedIcon from '../../../common/assets/images/processed.svg';
import soldIcon from '../../../common/assets/images/sold.svg';

export const getSummaryData = (
  totalDeals: number | undefined,
  processedDeals: number | undefined,
  soldDeals: number | undefined,
  conversion: number | undefined,
  bonus?: number | undefined,
  income?: number | undefined,
  pax?: number | undefined,
  additionalBonuses?: number | undefined,
  crmManagement?: number | number
) => [
  { icon: dealsIcon, title: 'всего сделок', value: totalDeals !== undefined ? totalDeals.toString() : '-' },
  { icon: processedIcon, title: 'обработано сделок', value: processedDeals !== undefined ? processedDeals.toString() : '-' },
  { icon: soldIcon, title: 'продано сделок', value: soldDeals !== undefined ? soldDeals.toString() : '-' },
  { icon: conversionIcon, title: 'конверсия', value: conversion !== undefined ? conversion.toString() : '-' },
  { icon: conversionIcon, title: 'бонус', value: bonus !== undefined ? bonus.toString() : '-' },
  { icon: conversionIcon, title: 'прибыль', value: income !== undefined ? income.toString() : '-' },
  { icon: conversionIcon, title: 'PAX', value: pax !== undefined ? pax.toString() : '-' },
  { icon: conversionIcon, title: 'доп. бонус', value: additionalBonuses !== undefined ? additionalBonuses.toString() : '-' },
  { icon: conversionIcon, title: 'ведение CRM', value: crmManagement !== undefined ? crmManagement.toString() : '-' }
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
