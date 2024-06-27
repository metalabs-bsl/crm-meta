export interface Task {
  id: string;
  lead_name: string;
  status: number;
  brutto: string | null;
  comment_or_reminder: string | null;
  count_of_reminders: number;
  customer: {
    date_of_birth: string;
    email: string;
    fullname: string;
    id: string;
    inn: string;
    passport: string;
    phone: string;
    created_at: string;
    city: string;
    source: string;
  };
}

export interface IColumn {
  status: number;
  column_name: string;
  color: string;
  leads: Task[];
  leads_count: number;
  id: string;
}
