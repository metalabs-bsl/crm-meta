import { Options } from 'types/pages';
import { historyApi } from 'api/admin/history/history.api';
import {
  ICreateComment,
  ICreateLead,
  ICreateReminder,
  IDeleteLead,
  IGetLead,
  IGetLeadsDeal,
  IGetSearch,
  ISourceLead,
  IUpdateLead,
  IUpdateLeadColumn
} from 'types/requests/admin/leads.api';
import { leadsMainApi } from '../leads.api';

export const leadApi = leadsMainApi.injectEndpoints({
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
      invalidatesTags: ['Detail-Lead'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(historyApi.util.invalidateTags(['History']));
      }
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
      }),
      invalidatesTags: ['Detail-Lead', 'Reminders']
    }),
    deleteReminder: mutation<void, string>({
      query: (id) => ({
        method: 'DELETE',
        url: `/leadsReminder/${id}`
      }),
      invalidatesTags: ['Detail-Lead', 'Reminders']
    }),
    doneReminder: mutation<void, string>({
      query: (id) => ({
        method: 'PATCH',
        url: `/leadsReminder/${id}`
      }),
      invalidatesTags: ['Detail-Lead', 'Reminders']
    }),
    createComment: mutation<ICreateComment.Response, ICreateComment.Params>({
      query: (body) => ({
        method: 'POST',
        url: `/leadsComments`,
        body
      }),
      invalidatesTags: ['Detail-Lead']
    }),
    deleteComment: mutation<void, string>({
      query: (id) => ({
        method: 'DELETE',
        url: `/leadsComments/${id}`
      }),
      invalidatesTags: ['Detail-Lead']
    }),
    getLeadsForTodo: query<IGetLeadsDeal.Response, IGetLeadsDeal.Params>({
      query: (type) => `/leads/deal/${type}`,
      providesTags: ['Reminders']
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
      invalidatesTags: ['Detail-Lead'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(historyApi.util.invalidateTags(['History']));
      }
    }),
    deleteLead: mutation<IDeleteLead.Response, IDeleteLead.Params>({
      query: (id) => ({
        method: 'DELETE',
        url: `/leads/${id}`
      }),
      invalidatesTags: ['Detail-Lead']
    }),
    searchLeads: query<IGetSearch.Response, IGetSearch.Params>({
      query: (value) => `/leads/search/${value}`,
      keepUnusedDataFor: 0
      // Ищет по:
      // Наименованию сделки
      // Имени клиента
      // Номеру договора
    })
  })
});

export const {
  useCreateLeadMutation,
  useGetSourseLeadQuery,
  useCreateReminderMutation,
  useLazyGetLeadsForTodoQuery,
  useDeleteLeadMutation,
  useLazyGetLeadQuery,
  useUpdateLeadMutation,
  useUpdateLeadColumnMutation,
  useDeleteReminderMutation,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useDoneReminderMutation,
  useLazySearchLeadsQuery
} = leadApi;
