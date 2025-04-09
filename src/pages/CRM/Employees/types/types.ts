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

export interface DataColumn {
  fullName: string;
  status: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  startDateInternship: string;
  startDateWork: string;
  agreement: string;
  passport: string;
}