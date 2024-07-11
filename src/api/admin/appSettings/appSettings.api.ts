import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { IGetAppSettings, IUpdateAppSettings } from 'types/requests/admin/appSettings.api';

export const appSettingsApi = createApi({
  reducerPath: 'appSettingsApi',
  baseQuery: getBaseQuery(),
  tagTypes: ['mainAccess'],
  endpoints: ({ query, mutation }) => ({
    getAppSettings: query<IGetAppSettings.Response, IGetAppSettings.Params>({
      query: () => '/app-settings',
      providesTags: ['mainAccess']
    }),
    updateAppSettings: mutation<IUpdateAppSettings.Response, IUpdateAppSettings.Params>({
      query: (body) => ({
        method: 'PATCH',
        url: `/app-settings`,
        body
      }),
      invalidatesTags: ['mainAccess']
    })
  })
});

export const { useGetAppSettingsQuery, useUpdateAppSettingsMutation } = appSettingsApi;
