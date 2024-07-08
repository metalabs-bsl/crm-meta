import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { IGetAppSettings, IUpdateAppSettings } from 'types/requests/admin/appSettings.api';

export const appSettingsApi = createApi({
  reducerPath: 'appSettingsApi',
  baseQuery: getBaseQuery(),
  endpoints: ({ query, mutation }) => ({
    getAppSettings: query<IGetAppSettings.Response, IGetAppSettings.Params>({
      query: () => '/app-settings'
    }),
    updateAppSettings: mutation<IUpdateAppSettings.Response, IUpdateAppSettings.Params>({
      query: (body) => ({
        method: 'PATCH',
        url: `/app-settings`,
        body
      })
    })
  })
});

export const { useGetAppSettingsQuery, useUpdateAppSettingsMutation } = appSettingsApi;
