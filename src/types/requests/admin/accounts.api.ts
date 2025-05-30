import { IAccountData, IUnpaidInvoicesCountData } from 'types/entities';

export module IGetAllAccounts {
  export type Response = IAccountData[];
  export type Params = string;
}

export namespace IGetUnpaidInvoicesCount {
  export type Response = IUnpaidInvoicesCountData;
  export type Params = void;
}
