import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILogin } from 'types/requests/admin/login.api';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  endpoints: ({ mutation }) => ({
    login: mutation<ILogin.Response, ILogin.Params>({
      query: (body) => ({
        method: 'post',
        url: `/auth/login`,
        body
      })
    })
  })
});

export const { useLoginMutation } = loginApi;
