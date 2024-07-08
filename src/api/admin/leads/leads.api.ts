import { createApi } from '@reduxjs/toolkit/query/react';
import { Options } from 'types/pages';
import { getBaseQuery } from 'common/helpers';
import {
  ICreateLead,
  ICreateReminder,
  IGetLead,
  IGetLeadsDeal,
  ISourceLead,
  IUpdateLead,
  IUpdateLeadColumn
} from 'types/requests/admin/leads.api';

export const leadsApi = createApi({
  reducerPath: 'leadsApi',
  baseQuery: getBaseQuery(),
  tagTypes: ['Detail-Lead'],
  endpoints: ({ query, mutation }) => ({
    createLead: mutation<ICreateLead.Response, ICreateLead.Params>({
      query: (body) => ({
        method: 'POST',
        url: `/leads`,
        body
      })
    }),
    updateLead: mutation<IUpdateLead.Response, IUpdateLead.Params>({
      query: ({ body, id }) => ({
        method: 'PATCH',
        url: `/leads/update/${id}`,
        body
      }),
      invalidatesTags: ['Detail-Lead']
    }),
    getSourseLead: query<Options[], ISourceLead.Params>({
      query: () => `/leadSources`,
      transformResponse: (data: ISourceLead.Response) => {
        return data.map((source) => ({
          label: source.source_name,
          value: source.id
        }));
      }
    }),
    createReminder: mutation<ICreateReminder.Response, ICreateReminder.Params>({
      query: (body) => ({
        method: 'POST',
        url: `/leadsReminder`,
        body
      })
    }),
    getLeadsForTodo: query<IGetLeadsDeal.Response, IGetLeadsDeal.Params>({
      query: () => `/leads/deal`
    }),
    getLead: query<IGetLead.Response, IGetLead.Params>({
      query: (id) => `/leads/find/${id}`,
      providesTags: ['Detail-Lead']
    }),
    updateLeadColumn: mutation<IUpdateLeadColumn.Response, IUpdateLeadColumn.Params>({
      query: (body) => ({
        method: 'PATCH',
        url: `/leads/column`,
        body
      }),
      invalidatesTags: ['Detail-Lead']
    })
  })
});

export const {
  useCreateLeadMutation,
  useGetSourseLeadQuery,
  useCreateReminderMutation,
  useGetLeadsForTodoQuery,
  useLazyGetLeadQuery,
  useUpdateLeadMutation,
  useUpdateLeadColumnMutation
} = leadsApi;
