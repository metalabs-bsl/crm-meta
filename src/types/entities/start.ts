export interface IStartSummary {
  totalDeals: number;
  employeeProcessedDeals: number;
  employeeSoldDeals: number;
  bonusPercentage: number;
}

export interface IEmployeeInfoParams {
  date_from: string;
  date_to: string;
  type: 'all' | 'my';
}
