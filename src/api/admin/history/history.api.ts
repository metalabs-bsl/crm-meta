import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { IGetHistory } from 'types/requests/admin/history.api';

export const historyApi = createApi({
  reducerPath: 'history',
  baseQuery: getBaseQuery(),
  tagTypes: ['History'],
  endpoints: ({ query }) => ({
    getHistory: query<IGetHistory.Response, IGetHistory.Params>({
      query: (leadId) => `/leads/history/${leadId}`,
      keepUnusedDataFor: 0,
      providesTags: ['History']
    })
  })
});

export const { useGetHistoryQuery } = historyApi;
