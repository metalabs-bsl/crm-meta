export { Employees } from '../Employees';

// типы для таблиц

export interface EditOptions {
  value: boolean;
  component?: 'input' | 'select';
  options?: string[];
}

export interface Column {
  title: string;
  key: string;
  isEdit?: EditOptions | boolean | { value: boolean; component?: string };
}

export interface DataColumn {
  [key: string]: string;
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
