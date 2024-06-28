export interface ICreateLeadParams {
  responsible_employee_id: string;
  lead_name: string;
  customer_name: string;
  customer_phone: string;
  city: string;
  source_id: string;
  date_created: Date;
  column_id: string;
}
export interface ISourse {
  id: string;
  created_at: string;
  updated_at: string;
  source_name: string;
}

export type IResSource = ISourse[];
