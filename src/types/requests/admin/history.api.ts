import { Change } from 'types/entities';

export module IGetHistory {
  export type Response = Record<string, Change[]>;
  export type Params = string;
}
