import { ICustomer } from './kanban';

export interface IPaymentDetailsData {
  id: string;
  name: string;
  paymentDateClient: string;
  comment: string;
  paymentDateSupervisor: string;
  invoice: {
    id: string;
    original_name: string;
  };
  amount: string;
  method: number;
  receipt: {
    id: string;
    original_name: string;
  };
  tourAmount: string;
  rate: string;
  isPaid: boolean;
  paymentTOType: number; // 1 - сом, 2 - доллар, 3 - евро
}

export interface IAccountData {
  id: string;
  contractNumber: string;
  bookingNumber: string;
  gross: string;
  net: string;
  commission: string;
  paymentStatus: string;
  destination: string;
  tourDates: string;
  tourOperator: string;
  tourInvoiceSom: string;
  tourInvoiceUSD: string;
  tourInvoiceEUR: string;
  whoCreated: string;
  customer: ICustomer;
  paymentDetails: IPaymentDetailsData[];
}

export interface IUnpaidInvoicesCountData {
  count: number;
}
