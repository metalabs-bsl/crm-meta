import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { IGetWorkTime } from 'types/requests/admin/workTime.api';

export const workTime = createApi({
  reducerPath: 'workTime',
  baseQuery: getBaseQuery(),
  endpoints: ({ query, mutation }) => ({
    start: mutation<void, void>({
      query: () => ({
        method: 'post',
        url: `/workDayAccounting`
      })
    }),
    end: mutation<void, string>({
      query: (id) => ({
        method: 'patch',
        url: `/workDayAccounting/end/${id}`
      })
    }),
    getWorkTimeInfo: query<IGetWorkTime.Response, IGetWorkTime.Params>({
      query: () => `/workDayAccounting`
    })
  })
});

export const { useStartMutation, useGetWorkTimeInfoQuery, useEndMutation } = workTime;
