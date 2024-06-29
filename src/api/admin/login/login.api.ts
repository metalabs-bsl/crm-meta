import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { IGetUserInfo, ILogin } from 'types/requests/admin/login.api';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: getBaseQuery(),
  tagTypes: ['UserInfo'],
  endpoints: ({ query, mutation }) => ({
    login: mutation<ILogin.Response, ILogin.Params>({
      query: (body) => ({
        method: 'POST',
        url: `/auth/login`,
        body
      })
    }),
    getUserInfo: query<IGetUserInfo.Response, IGetUserInfo.Params>({
      query: () => `/employees`,
      providesTags: ['UserInfo']
    }),
    logout: mutation<{ message: string }, void>({
      query: () => ({
        method: 'POST',
        url: `/auth/logout`
      })
    })
  })
});

export const { useLoginMutation, useLazyGetUserInfoQuery, useLogoutMutation } = loginApi;
