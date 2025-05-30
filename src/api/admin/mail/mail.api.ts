import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { IForwardMessage, IMailGet, IMailSingleGet, IMailTabsCounts, ISetPinMessage, ISetReadMessage } from 'types/requests/admin/mail.api';

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
    refreshMail: mutation<void, void>({
      query: (body) => ({
        method: 'POST',
        url: `/employees/mail/refresh`,
        body
      }),
      invalidatesTags: ['Mail', 'Counts']
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
      query: ({ id, hasBeenRead }) => ({
        method: 'PATCH',
        url: `/employees/mail/read?id=${id}&hasBeenRead=${hasBeenRead}`
      }),
      invalidatesTags: ['Counts', 'Mail']
    }),
    setPinMessage: mutation<ISetPinMessage.Response, ISetPinMessage.Params>({
      query: ({ id, isPinned }) => ({
        method: 'PATCH',
        url: `/employees/mail/pin?id=${id}&pin=${isPinned}`
      }),
      invalidatesTags: ['Counts', 'Mail']
    }),
    forwardMessage: mutation<IForwardMessage.Response, IForwardMessage.Params>({
      query: ({ mail_id, mail_to }) => ({
        method: 'POST',
        url: `/employees/mail/reply?mail_id=${mail_id}&mail_to=${mail_to}`
      }),
      invalidatesTags: ['Counts', 'Mail']
    })
  })
});

export const {
  useLazyGetSingleMailQuery,
  useLazyGetMailQuery,
  useGetSignQuery,
  useSendMailMutation,
  useGetMailCountsOfTabsQuery,
  useSetReadMessageMutation,
  useSetPinMessageMutation,
  useForwardMessageMutation,
  useRefreshMailMutation
} = mailApi;
