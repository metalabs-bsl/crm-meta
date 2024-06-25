import { ILoginParams } from 'types/entities';
import { ILoginRes } from 'types/entities/login';

export module ILogin {
  export type Response = ILoginRes;
  export type Params = ILoginParams;
}
