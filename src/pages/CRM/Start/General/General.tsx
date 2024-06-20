import { FC } from 'react';
import { StartTable } from '../StartTable';
import { IEmployeeInfo } from '../types/IEmployee';
import styles from './styles.module.scss';

// Mock data
const employees: IEmployeeInfo[] = [
  {
    name: 'Кайбагаров Адилет',
    bonuses: '8%',
    additionalBonuses: '1.5%',
    profit: '2000$',
    applications: 100,
    avgCheck: '1500$',
    avgCommissionCheck: '1500$',
    tourists: 100,
    totalDeals: 20,
    processedDeals: 20,
    soldDeals: 15,
    conversion: '5%',
    contracts: [
      {
        contractNumber: 1234567890,
        brutto: '800.80$',
        netto: '800.80$',
        paid: '150$',
        profit: '30$',
        additionalBonuses: '10$',
        payer: 'Омуракунова Айгул',
        tourName: 'Жемчужина Ыссык-Кол',
        startDate: '22.07.2024',
        pax: 5,
        isPaid: false
      }
    ]
  },
  {
    name: 'Абдусатарова Мээримай',
    bonuses: '6%',
    additionalBonuses: '1%',
    profit: '1000$',
    applications: 79,
    avgCheck: '600$',
    avgCommissionCheck: '200$',
    tourists: 50,
    totalDeals: 20,
    processedDeals: 20,
    soldDeals: 15,
    conversion: '5%',
    contracts: [
      {
        contractNumber: 1234567890,
        brutto: '800.80$',
        netto: '800.80$',
        paid: '150$',
        profit: '30$',
        additionalBonuses: '10$',
        payer: 'Омуракунова Айгул',
        tourName: 'Жемчужина Ыссык-Кол',
        startDate: '22.07.2024',
        pax: 5,
        isPaid: true
      }
    ]
  },
  {
    name: 'Абдусатарова Мээримай',
    bonuses: '6%',
    additionalBonuses: '1%',
    profit: '1000$',
    applications: 79,
    avgCheck: '600$',
    avgCommissionCheck: '200$',
    tourists: 50,
    totalDeals: 20,
    processedDeals: 20,
    soldDeals: 15,
    conversion: '5%',
    contracts: [
      {
        contractNumber: 1234567890,
        brutto: '800.80$',
        netto: '800.80$',
        paid: '150$',
        profit: '30$',
        additionalBonuses: '10$',
        payer: 'Омуракунова Айгул',
        tourName: 'Жемчужина Ыссык-Кол',
        startDate: '22.07.2024',
        pax: 5,
        isPaid: true
      }
    ]
  },
  {
    name: 'Абдусатарова Мээримай',
    bonuses: '6%',
    additionalBonuses: '1%',
    profit: '1000$',
    applications: 79,
    avgCheck: '600$',
    avgCommissionCheck: '200$',
    tourists: 50,
    totalDeals: 20,
    processedDeals: 20,
    soldDeals: 15,
    conversion: '5%',
    contracts: [
      {
        contractNumber: 1234567890,
        brutto: '800.80$',
        netto: '800.80$',
        paid: '150$',
        profit: '30$',
        additionalBonuses: '10$',
        payer: 'Омуракунова Айгул',
        tourName: 'Жемчужина Ыссык-Кол',
        startDate: '22.07.2024',
        pax: 5,
        isPaid: true
      }
    ]
  },
  {
    name: 'Абдусатарова Мээримай',
    bonuses: '6%',
    additionalBonuses: '1%',
    profit: '1000$',
    applications: 79,
    avgCheck: '600$',
    avgCommissionCheck: '200$',
    tourists: 50,
    totalDeals: 20,
    processedDeals: 20,
    soldDeals: 15,
    conversion: '5%',
    contracts: [
      {
        contractNumber: 1234567890,
        brutto: '800.80$',
        netto: '800.80$',
        paid: '150$',
        profit: '30$',
        additionalBonuses: '10$',
        payer: 'Омуракунова Айгул',
        tourName: 'Жемчужина Ыссык-Кол',
        startDate: '22.07.2024',
        pax: 5,
        isPaid: true
      }
    ]
  }
];

export const General: FC = () => {
  return (
    <div className={styles.content}>
      {employees.map((employee, index) => (
        <StartTable key={index} employee={employee} />
      ))}
    </div>
  );
};
