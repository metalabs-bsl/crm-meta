export interface PaymentRowData {
  paymentDateClient: string;
  comment: string;
  paymentDateSupervisor: string;
  invoice: string[]; // тут должны приходить файлы с бэка и тип изменится
  amount: string;
  method: string;
  receipt: string[]; // тут должны приходить файлы с бэка и тип изменится
  tourAmount: string;
  employeeInvoice: string[]; // тут должны приходить файлы с бэка и тип изменится
  isPaid: boolean;
}

export interface TableRowData {
  contractNumber: string;
  bookingNumber: string;
  gross: string;
  net: string;
  rate: string;
  commission: string;
  paymentMethod: string;
  destination: string;
  tourDates: string;
  tourOperator: string;
  tourInvoice: string;
  whoCreated: string;
  paymentDetails: PaymentRowData[];
}
