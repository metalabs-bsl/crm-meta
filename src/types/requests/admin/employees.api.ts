import { IEmployeeData } from 'pages/CRM/Employees/types/types';
import { IResResponsible, IUserInfoRes } from 'types/entities';

export module IGetResponsibleEmployees {
  export type Response = IResResponsible;
  export type Params = void;
}

export module IGetUserInfo {
  export type Response = IUserInfoRes;
  export type Params = void;
}

export module IGetAllEmployees {
  export type Response = IEmployeeData[];
  export type Params = void;
}
