import { ICreateLeadParams, IResSource } from 'types/entities';

export module ICreateLead {
  export type Response = void;
  export type Params = ICreateLeadParams;
}

export module ISourceLead {
  export type Response = IResSource;
  export type Params = void;
}
