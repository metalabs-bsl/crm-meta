import { ICreateColumnParams, IGetColumnsRes } from 'types/entities';

export module ICreateColumn {
  export type Response = void;
  export type Params = ICreateColumnParams;
}

export module IGetColumns {
  export type Response = IGetColumnsRes[];
  export type Params = void;
}

export namespace IGetTotalBruttoSum {
  export type Response = number;
  export type Params = { startDate: string; endDate: string };
}
