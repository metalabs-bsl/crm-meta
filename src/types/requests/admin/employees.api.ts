import { IEmployee, IResResponsible, IRole, IUserInfoRes } from 'types/entities';

export module IGetResponsibleEmployees {
  export type Response = IResResponsible;
  export type Params = void;
}

export module IGetUserInfo {
  export type Response = IUserInfoRes;
  export type Params = void;
}

export module IGetAllEmployees {
  export type Response = IEmployee[];
  export type Params = void;
}

export module IGetEmployeeRoles {
  export type Response = IRole[];
  export type Params = void;
}
