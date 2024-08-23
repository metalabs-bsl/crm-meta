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
}

export interface IAccountData {
  contractNumber: string;
  // bookingNumber: string;
  gross: string;
  net: string;
  // rate: string;
  commission: string;
  // paymentMethod: string;
  paymentStatus: string;
  // destination: string;
  tourDates: string;
  // tourOperator: string;
  tourInvoice: string;
  whoCreated: string;
  paymentDetails: IPaymentDetailsData[];
}
