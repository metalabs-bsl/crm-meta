import { IComment_or_Reminder, ICustomer, IResponsible_employee } from './kanban';
import { ILeadColumn } from './leads';

export interface IListLead {
  brutto: string;
  comment_or_reminder: IComment_or_Reminder;
  count_of_reminders: number;
  created_at: string;
  customer: ICustomer;
  id: string;
  lead_column: ILeadColumn & {
    source: {
      id: string;
      name: string;
    };
  };
  lead_name: string;
  responsible_employee: IResponsible_employee;
  updated_at: string;
}

export interface IColumnStages {
  color: string;
  created_at: string;
  id: string;
  name: string;
  status: number;
  updated_at: string;
}

export interface IList {
  leads: IListLead[];
  stages: IColumnStages[];
}
