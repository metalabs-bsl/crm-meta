export interface IEmployeeContract {
  contractNumber: number;
  brutto: string;
  netto: string;
  paid: string;
  profit: string;
  additionalBonuses: string;
  payer: string;
  tourName: string;
  startDate: string;
  pax: number;
  isPaid: boolean;
}

export interface IEmployeeInfo {
  name: string;
  bonuses: string;
  additionalBonuses: string;
  profit: string;
  applications: number;
  avgCheck: string;
  avgCommissionCheck: string;
  tourists: number;
  contracts: IEmployeeContract[];
  totalDeals: number;
  processedDeals: number;
  soldDeals: number;
  conversion: string;
}
