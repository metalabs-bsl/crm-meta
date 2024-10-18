import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { ICreateColumn, IGetColumns, IGetTotalBruttoSum } from 'types/requests/admin/kanban.api';

export const kanbanApi = createApi({
  reducerPath: 'kanbanApi',
  baseQuery: getBaseQuery(),
  endpoints: ({ query, mutation }) => ({
    getColumns: query<IGetColumns.Response, IGetColumns.Params>({
      query: () => `/leadsColumns`,
      keepUnusedDataFor: 0
    }),
    getTotalBruttoSum: query<IGetTotalBruttoSum.Response, IGetTotalBruttoSum.Params>({
      query: ({ startDate, endDate }) => `/leads/total-brutto-sum?date_from=${startDate}T00:00&date_to=${endDate}T23:59`
    }),
    createColumn: mutation<ICreateColumn.Response, ICreateColumn.Params>({
      query: ({ body, id }) => ({
        method: 'POST',
        url: `/leadsColumns/${id}`,
        body
      })
    }),
    updateColumn: mutation<ICreateColumn.Response, ICreateColumn.Params>({
      query: ({ body, id }) => ({
        method: 'PATCH',
        url: `/leadsColumns/${id}`,
        body
      })
    }),
    deleteColumn: mutation<void, string>({
      query: (id) => ({
        method: 'DELETE',
        url: `/leadsColumns/${id}`
      })
    })
  })
});

export const { useCreateColumnMutation, useGetTotalBruttoSumQuery, useDeleteColumnMutation, useUpdateColumnMutation, useGetColumnsQuery } =
  kanbanApi;
