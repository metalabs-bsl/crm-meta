import { createApi } from '@reduxjs/toolkit/query/react';
import { IEmployeeInfo } from 'pages/CRM/Start/types/IEmployee';
import { getBaseQuery } from 'common/helpers';
import { IEmployeeInfoParams } from 'types/entities/start';

export const startApi = createApi({
  reducerPath: 'startApi',
  baseQuery: getBaseQuery(),
  endpoints: ({ query }) => ({
    getStartTableInfo: query<IEmployeeInfo | IEmployeeInfo[], IEmployeeInfoParams>({
      query: (params) => `/leads/start2?date_from=${params.date_from}&date_to=${params.date_to}&type=${params.type}`
    })
  })
});

export const { useGetStartTableInfoQuery } = startApi;
