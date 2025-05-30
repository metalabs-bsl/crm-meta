import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { ILogin } from 'types/requests/admin/login.api';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: getBaseQuery(),
  endpoints: ({ mutation }) => ({
    login: mutation<ILogin.Response, ILogin.Params>({
      query: (body) => ({
        method: 'POST',
        url: `/auth/login`,
        body
      })
    }),
    logout: mutation<{ message: string }, void>({
      query: () => ({
        method: 'POST',
        url: `/auth/logout`
      })
    })
  })
});

export const { useLoginMutation, useLogoutMutation } = loginApi;
