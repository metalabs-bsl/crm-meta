import { IRole } from 'types/entities';

export { Employees } from '../Employees';

export interface EditOptions {
  value: string;
  component?: 'input' | 'select';
}

export interface Column {
  title: string;
  key: string;
  isEdit?: EditOptions | boolean | { value: boolean; component?: string };
}

export interface IEmployeeData {
  background?: string;
  created_at?: string;
  date_of_birth: string;
  email: string;
  email_password: string;
  end_of_internship?: string;
  first_name?: string;
  id: string;
  job_title: string;
  login: string;
  middle_name?: string;
  password?: string;
  phone: string;
  refreshToken?: string;
  roles: IRole[];
  second_name?: string;
  start_of_internship: string;
  start_of_work: string;
  status?: number;
  updated_at?: string;
  contract?: {
    id: string;
    original_name: string;
  };
  passport_back?: {
    id: string;
    original_name: string;
  };
  passport_front?: {
    id: string;
    original_name: string;
  };
}
