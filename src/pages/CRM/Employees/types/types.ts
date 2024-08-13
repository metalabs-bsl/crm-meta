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

export interface IEmployeeRole {
  created_at: string;
  id: string;
  role_name: string;
  updated_at: string;
}

export interface IEmployeeData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  background: string;
  created_at: string;
  date_of_birth: string;
  email: string;
  email_password: string;
  end_of_internship: string;
  first_name: string;
  id: string;
  job_title: string;
  login: string;
  middle_name: string;
  password: string;
  phone: string;
  refreshToken: string;
  roles: IEmployeeRole[];
  second_name: string;
  start_of_internship: string;
  start_of_work: string;
  status: number;
  updated_at: string;
  contracts: string[];
  passportBack: {
    path: string;
    filename: string;
    original_name: string;
  };
  passportFront: {
    path: string;
    filename: string;
    original_name: string;
  };
}
