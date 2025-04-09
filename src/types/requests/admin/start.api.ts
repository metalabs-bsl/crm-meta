import { IStartSummary } from 'types/entities';

export namespace IGetSummary {
  export type Response = IStartSummary;
  export type Params = { startDate: string; endDate: string };
}
