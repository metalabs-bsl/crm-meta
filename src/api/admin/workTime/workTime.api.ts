import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { IGetWorkTime } from 'types/requests/admin/workTime.api';

export const workTime = createApi({
  reducerPath: 'workTime',
  baseQuery: getBaseQuery(),
  tagTypes: ['WorkTime'],
  endpoints: ({ query, mutation }) => ({
    start: mutation<void, void>({
      query: () => ({
        method: 'post',
        url: `/workDayAccounting`
      }),
      invalidatesTags: ['WorkTime']
    }),
    end: mutation<void, string>({
      query: (id) => ({
        method: 'PATCH',
        url: `/workDayAccounting/end/${id}`
      }),
      invalidatesTags: ['WorkTime']
    }),
    pause: mutation<void, string>({
      query: (id) => ({
        method: 'PATCH',
        url: `/workDayAccounting/pause/${id}`
      }),
      invalidatesTags: ['WorkTime']
    }),
    unPause: mutation<void, string>({
      query: (id) => ({
        method: 'PATCH',
        url: `/workDayAccounting/unpause/${id}`
      }),
      invalidatesTags: ['WorkTime']
    }),
    getWorkTimeInfo: query<IGetWorkTime.Response, IGetWorkTime.Params>({
      query: () => `/workDayAccounting`,
      providesTags: ['WorkTime']
    })
  })
});

export const { useStartMutation, useGetWorkTimeInfoQuery, useEndMutation, usePauseMutation, useUnPauseMutation } = workTime;
