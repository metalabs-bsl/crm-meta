import { UserRoleUnionType } from 'types/roles/roles';

import { BG_TYPES } from 'types/enums';

export interface IResponsibleEmployees {
  id: string;
  first_name: string;
  second_name: string;
  email: string;
}

export type IResResponsible = IResponsibleEmployees[];

export interface IRole {
  created_at: string;
  id: string;
  role_name: UserRoleUnionType;
  updated_at: string;
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

export interface IEmployee {
  avatar: null | IAvatar;
  background: BG_TYPES;
  created_at: string;
  date_of_birth: string;
  email: string;
  email_password: string;
  end_of_internship?: string;
  first_name: string;
  id: string;
  job_title: string;
  login: string;
  middle_name: string;
  password: string;
  phone: string;
  whatsapp_status: boolean;
  personal_phone: string;
  refreshToken: string;
  roles: IRole[];
  second_name: string;
  start_of_internship: string;
  start_of_work: string;
  status: number;
  updated_at: string;
  contract: {
    id: string;
    original_name: string;
  };
  passport_back: {
    id: string;
    original_name: string;
  };
  passport_front: {
    id: string;
    original_name: string;
  };
}
