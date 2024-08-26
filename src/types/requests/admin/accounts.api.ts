import { IAccountData } from 'types/entities/accounts';

export module IGetAllAccounts {
  export type Response = IAccountData[];
  export type Params = string;
}
