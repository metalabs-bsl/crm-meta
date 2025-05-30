export interface IEmployeeContract {
  contractNumber: number; // номер договора
  brutto: string; // Брутто
  netto: string; // Нетто
  paid: string; // оплачено
  profit: string; // прибыль
  additionalBonuses: string; // доп.бонусы
  payer: string; // плательщик
  tourName: string; // название тура
  startDate: string; // дата начала тура
  pax: number; // PAX
  isPaid: boolean; // нужно для окраски строки в красный или белый цвет
}

export interface IEmployeeInfo {
  totalDeals: number; // всего сделок
  processedDeals: number; // обработано сделок
  soldDeals: number; // продано сделок
  conversion: string; // конверсия
  name: string; // сотрудник
  bonuses: string; // бонусы
  additionalBonuses: string; // доп.бонусы
  profit: string; // прибыль
  applications: number; // кол-во заявок
  avgCheck: string; // сред.чек всех заявок
  avgCommissionCheck: string; // сред.чек комиссии
  tourists: number; // кол-во туристов
  contracts: IEmployeeContract[]; // массив сделок сотрудника
}
