import { ILoginParams } from 'types/entities';
import { ILoginRes, IUserInfoRes } from 'types/entities/login';

export module ILogin {
  export type Response = ILoginRes;
  export type Params = ILoginParams;
}

export module IGetUserInfo {
  export type Response = IUserInfoRes;
  export type Params = void;
}
