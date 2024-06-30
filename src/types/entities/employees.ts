import { UserRoleUnionType } from 'types/roles/roles';

import { BG_TYPES } from 'types/enums';

export interface IResponsibleEmployees {
  id: string;
  first_name: string;
  second_name: string;
  email: string;
}

export type IResResponsible = IResponsibleEmployees[];

interface IRole {
  id: string;
  role_name: UserRoleUnionType;
}

interface IAvatar {
  created_at: string;
  encoding: string;
  filename: string;
  id: string;
  mimetype: string;
  original_name: string;
  path: string;
  size: number;
  updated_at: string;
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
  job_title: string;
  avatar: null | IAvatar;
  background: BG_TYPES;
}

export interface IEmployee {
  id: string;
  first_name: string;
  second_name: string;
  email: string;
  date_of_birth: string;
  status: string;
  start_of_internship: string;
  created_at: string;
  phone: string;
  contract_id: string;
  passport_id: string;
}

export interface iAddEmployee {
  id: string;
  first_name: string;
  second_name: string;
  status: string;
  phone: string;
  email: string;
  contract_id: string;
  passport_id: string;
}
