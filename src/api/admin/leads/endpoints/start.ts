import { IGetSummary } from 'types/requests/admin/start.api';
import { leadsMainApi } from '../leads.api';

export const invoiceApi = leadsMainApi.injectEndpoints({
  endpoints: ({ query }) => ({
    getSummary: query<IGetSummary.Response, IGetSummary.Params>({
      query: ({ startDate, endDate }) => `/leads/start?date_from=${startDate}T00:00&date_to=${endDate}T23:59`
    })
  })
});

export const { useGetSummaryQuery } = invoiceApi;
