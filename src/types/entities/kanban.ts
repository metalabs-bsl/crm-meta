import { IResponsibleEmployees } from './employees';

export interface IComment_or_Reminder {
  date_to_finish: string;
  text: string;
  type: string;
}

export interface IResponsible_employee extends IResponsibleEmployees {
  avatar_id: string;
  phone: string;
}

export interface ICustomer {
  date_of_birth: string;
  email: string;
  fullname: string;
  id: string;
  inn: string;
  passport: string;
  phone: string;
  city: string;
  source: string;
}

export interface Task {
  id: string;
  lead_name: string;
  status: number;
  brutto: string | null;
  comment_or_reminder: IComment_or_Reminder;
  count_of_reminders: number;
  created_at: string;
  customer: ICustomer;
  responsible_employee: IResponsible_employee;
}

export interface IColumn {
  status: number;
  column_name: string;
  color: string;
  leads: Task[];
  leads_count: number;
  id: string;
}

export interface IColumnInfo {
  name: string;
  color: string;
  status?: number;
}

export interface ICreateColumnParams {
  id: string;
  body: IColumnInfo;
}
