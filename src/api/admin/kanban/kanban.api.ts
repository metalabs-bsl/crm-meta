import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { ICreateColumn } from 'types/requests/admin/kanban.api';

export const kanbanApi = createApi({
  reducerPath: 'kanbanApi',
  baseQuery: getBaseQuery(),
  endpoints: ({ mutation }) => ({
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

export const { useCreateColumnMutation, useDeleteColumnMutation, useUpdateColumnMutation } = kanbanApi;
