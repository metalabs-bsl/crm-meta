import { UserRoleUnionType } from 'types/roles/roles';

export interface ILoginParams {
  login: string;
  password: string;
}

export interface ILoginRes {
  accessToken: string;
  refreshToken: string;
}

interface IRole {
  id: string;
  role_name: UserRoleUnionType;
}

export interface IUserInfoRes {
  id: string;
  created_at: string;
  email: string;
  end_of_internship: null;
  first_name: string;
  login: string;
  phone: string;
  roles: IRole[];
  second_name: string;
  start_of_internship: null;
  status: number;
  updated_at: string;
}
