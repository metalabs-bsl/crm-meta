import { IUserInfoRes } from './employees';
import { ICustomer } from './kanban';

export interface ICreateLeadParams {
  responsible_employee_id?: string;
  lead_name?: string;
  customer_name?: string;
  customer_phone?: string;
  city?: string;
  source_id?: string;
  column_id?: string;
  customer_DOB?: string;
  customer_id?: string;
}

export interface IUpdateLeadParams {
  body: ICreateLeadParams;
  id: string;
}

export interface ISourse {
  id: string;
  created_at: string;
  updated_at: string;
  source_name: string;
}

export type IResSource = ISourse[];

export interface ICreateCommentParams {
  comment_text: string;
  lead_id: string;
}

export interface ICreateInvoiceParams {
  invoice_text: string;
  file_id: File;
}

export interface IgetLeadAdditionalPayments {
  id: string;
  name: string;
  brutto: string;
  netto: string;
  exchange_rate: string;
  payment_method: number;
  commission: string;
  comment: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICreateReminderParams {
  reminder_text: string;
  status: number;
  date_to_finish: string;
  lead_id: string;
  created_at: string;
  id: string;
  updated_at: string;
}

export interface IResponsible_Employee extends IUserInfoRes {
  date_of_birth: string;
  email_password: string;
  middle_name: string;
  password: string;
  refreshToken: string;
  start_of_work: string;
}

export interface ILeadColumn {
  color: string;
  created_at: string;
  id: string;
  name: string;
  order: number;
  status: number;
  updated_at: string;
}

export interface IComment {
  id: string;
  created_at: string;
  updated_at: string;
  comment_text: string;
}

export interface ICalculator {
  created_at: string;
  id: string;
  is_closed: true;
  is_full_payment: boolean;
  payment_status: string;
  updated_at: string;
}

export interface ILead {
  updated_at: string;
  source: ISourse;
  responsible_employee: IResponsible_Employee;
  reminders: ICreateReminderParams[];
  order: number;
  lead_name: string;
  lead_column: ILeadColumn;
  id: string;
  customer: ICustomer;
  created_at: string;
  comments: IComment[];
  calculator: ICalculator[];
}

export interface IUpdateLeadColumnParams {
  column_id: string;
  lead_id: string;
}

export interface IUpdateLeadCalcPaidStatusParams {
  calc_id: string;
  paid_status: string;
}

export interface IResSearch {
  lead_name: string;
  id: string;
}

export interface IAdditionalPayment {
  brutto: number;
  name: string;
  netto: number;
  currency: string;
  exchange_rate: number;
  payment_method: string;
  commission: number;
  comment: string;
  course_TO: number;
  client_due_date: string;
  id?: string;
  calculator: {
    id: string;
  };
}

export interface ICalcPayment {
  id?: string;
  brutto: number;
  netto: number;
  currency: string;
  exchange_rate: number;
  course_TO: number;
  payment_method: number;
  commission: number;
  client_due_date: string;
  calculator: {
    id: string;
  };
}

export interface ISetAdditionalPaymentRes extends Omit<ICalcPayment, 'course_TO' | 'payment_method'> {
  name: string;
  comment: string;
}

export interface ITourData {
  booking_number: string;
  departure_city: string;
  arrival_city: string;
  brand: string;
  departure_date: string;
  arrival_date: string;
  hotel: string;
  adult_passengers: number;
  child_passengers: number;
  services: string[];
  tour_category: string;
  id?: string;
  calculator: {
    id: string;
  };
}

export interface IPassportResponse {
  original_name: string;
  path: string;
  id: string;
}
export interface ICalcCustomer extends ICustomer {
  created_at: string;
  updated_at: string;
  address: string;
  issuingAuthority: string;
  datePassportGiven: string;
  passport_back: IPassportResponse[];
  passport_front: IPassportResponse[];
}
export interface IContract {
  id: string;
  contract_number: number;
  booking_date: string;
  created_at: string;
  updated_at: string;
  customer: ICalcCustomer;
  responsible: IResponsible_Employee;
}

export interface IPassportParams {
  body: FormData;
  customerId: string;
}

export interface IUpdateContract {
  id: string;
  contract_number?: number;
  booking_date?: string;
  customer_passport?: string;
  customer_inn?: string;
  customer_address?: string;
  customer_fullname?: string;
  responsible_id?: string;
  customer_passportDateGiven?: string;
  customer_issuingAuthority?: string;
  passport_back: IPassportResponse[];
  passport_front: IPassportResponse[];
}

export interface IResCalc extends ICalculator {
  contracts: IContract[];
  additionalPayments: IAdditionalPayment[];
  paymentData: ICalcPayment[];
  tourData: ITourData[];
  lead: ILead;
}

export interface ICreatePaymentParams {
  id?: string | null;
  brutto: number;
  netto: number;
  currency: string;
  exchange_rate: number;
  payment_method: number;
  course_TO: number;
  commission: number;
  client_due_date: string;
  calculator: {
    id: string;
  };
  title?: string;
  isEdit?: boolean;
}

export interface IResPaymentCurrency {
  id: string;
  created_at?: string;
  updated_at?: string;
  currency?: string;
}
