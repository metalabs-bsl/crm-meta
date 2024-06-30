import { iAddEmployee, IEmployee, IResResponsible, IUserInfoRes } from 'types/entities';

export module IGetResponsibleEmployees {
  export type Response = IResResponsible;
  export type Params = void;
}

export module IGetUserInfo {
  export type Response = IUserInfoRes;
  export type Params = void;
}

export module IGetEmployee {
  export type Response = IEmployee;
  export type Params = void;
}

export module IAddEmployeeForm {
  export type Response = iAddEmployee;
  export type Params = void;
}
