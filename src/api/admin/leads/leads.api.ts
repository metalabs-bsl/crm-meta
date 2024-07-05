import { createApi } from '@reduxjs/toolkit/query/react';
import { Options } from 'types/pages';
import { getBaseQuery } from 'common/helpers';
import { ICreateLead, ICreateReminder, IGetLeadsDeal, ISourceLead } from 'types/requests/admin/leads.api';

export const leadsApi = createApi({
  reducerPath: 'leadsApi',
  baseQuery: getBaseQuery(),
  endpoints: ({ query, mutation }) => ({
    createLead: mutation<ICreateLead.Response, ICreateLead.Params>({
      query: (body) => ({
        method: 'POST',
        url: `/leads`,
        body
      })
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
    })
  })
});

export const { useCreateLeadMutation, useGetSourseLeadQuery, useCreateReminderMutation, useGetLeadsForTodoQuery } = leadsApi;
