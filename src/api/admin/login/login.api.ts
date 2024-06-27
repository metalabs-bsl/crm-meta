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
        method: 'post',
        url: `/auth/login`,
        body
      })
    }),
    getUserInfo: query<IGetUserInfo.Response, IGetUserInfo.Params>({
      query: () => `/employees`,
      providesTags: ['UserInfo']
    })
  })
});

export const { useLoginMutation, useLazyGetUserInfoQuery } = loginApi;
