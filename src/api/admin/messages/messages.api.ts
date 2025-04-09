import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { IMessageResponse } from 'types/entities/messages';

export const messagesApi = createApi({
  reducerPath: 'message',
  baseQuery: getBaseQuery(),
  endpoints: ({ mutation }) => ({
    getMessages: mutation<IMessageResponse[], string>({
      query: (phone: string) => ({
        method: 'POST',
        url: `/customer/messages/${phone}`
      })
    })
  })
});

export const { useGetMessagesMutation } = messagesApi;
