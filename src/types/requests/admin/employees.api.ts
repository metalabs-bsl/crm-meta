import { IResResponsible, IUserInfoRes } from 'types/entities';

export module IGetResponsibleEmployees {
  export type Response = IResResponsible;
  export type Params = void;
}

export module IGetUserInfo {
  export type Response = IUserInfoRes;
  export type Params = void;
}
