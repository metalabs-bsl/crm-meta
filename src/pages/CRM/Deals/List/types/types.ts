export interface ICustomerData {
  fullname: string;
  birthday: string;
  phone: string;
  city: string;
  source: string;
}

export interface ILeadRow {
  order: number;
  // responsible_employee: string;
  id: string;
  dealStage: string;
  lead_name: string;
  customer: ICustomerData;
  lead_column: { id: string };
  responsible_employee: {
    first_name: string;
    second_name?: string;
    email: string;
    phone: string;
    id: string;
  };
}

export interface IStageData {
  color: string;
  created_at: string;
  id: string;
  name: string;
  status: number;
  updated_at: string;
}

export interface TableRow {
  name: string;
  leads: ILeadRow[];
  stages: IStageData[];
}

export interface TableColumn {
  key: string;
  title: string;
  isEdit?: {
    value: boolean;
    component: 'input' | 'select' | 'miniprogress' | 'date';
  };
  isDropdown?: boolean;
  date?: string;
}
