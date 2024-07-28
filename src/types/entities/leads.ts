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
