import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { IMailGet, IMailSingleGet, IMailTabsCounts, ISetReadMessage } from 'types/requests/admin/mail.api';

export const mailApi = createApi({
  reducerPath: 'mailApi',
  baseQuery: getBaseQuery(),
  tagTypes: ['Mail', 'Sign', 'Counts', 'Single'],
  endpoints: ({ query, mutation }) => ({
    getMailCountsOfTabs: query<IMailTabsCounts.Response, IMailTabsCounts.Params>({
      query: () => '/employees/mail/count',
      providesTags: ['Counts']
    }),
    getMail: query<IMailGet.Response, IMailGet.Params>({
      query: (params) => `/employees/mail/all?type=${params.type}&search=${params.search}`,
      providesTags: ['Mail']
    }),
    getSingleMail: query<IMailSingleGet.Response, IMailSingleGet.Params>({
      query: (id) => `/employees/mail/single/${id}`,
      providesTags: ['Single']
    }),
    getSign: query<string, void>({
      query: () => '/employees/mail/sign',
      providesTags: ['Sign'],
      keepUnusedDataFor: 0
    }),
    sendMail: mutation<void, FormData>({
      query: (body) => ({
        method: 'POST',
        url: `/employees/mail`,
        body
      }),
      invalidatesTags: ['Mail', 'Counts']
    }),
    setReadMessage: mutation<ISetReadMessage.Response, ISetReadMessage.Params>({
      query: (body) => ({
        method: 'PATCH',
        url: `/employees/mail/read?id=${body.id}&hasBeenRead=${body.hasBeenRead}`,
        body
      }),
      invalidatesTags: ['Counts']
    })
  })
});

export const {
  useLazyGetSingleMailQuery,
  useLazyGetMailQuery,
  useGetSignQuery,
  useSendMailMutation,
  useGetMailCountsOfTabsQuery,
  useSetReadMessageMutation
} = mailApi;
