import { createApi } from '@reduxjs/toolkit/query/react';
import { Options } from 'types/pages';
import { getBaseQuery } from 'common/helpers';
import { IGetResponsibleEmployees, IGetUserInfo } from 'types/requests/admin/employees.api';

import { BG_TYPES } from 'types/enums';

export const employessApi = createApi({
  reducerPath: 'employessApi',
  baseQuery: getBaseQuery(),
  endpoints: ({ query, mutation }) => ({
    getResponsibleEmployees: query<Options[], IGetResponsibleEmployees.Params>({
      query: () => `/employees/all`,
      transformResponse: (data: IGetResponsibleEmployees.Response) => {
        return data.map((employee) => ({
          label: `${employee.first_name} ${employee.second_name}`,
          value: employee.id
        }));
      }
    }),
    uploadAvatar: mutation<void, FormData>({
      query: (body) => ({
        method: 'POST',
        url: `/employees/avatar`,
        body
      })
    }),
    deleteAvatar: mutation<void, void>({
      query: (body) => ({
        method: 'DELETE',
        url: `/employees/avatar`,
        body
      })
    }),
    updateBg: mutation<void, BG_TYPES>({
      query: (background) => ({
        method: 'PATCH',
        url: `/employees/background/${background}`
      })
    }),
    getUserInfo: query<IGetUserInfo.Response, IGetUserInfo.Params>({
      query: () => `/employees`
    })
  })
});

export const {
  useGetResponsibleEmployeesQuery,
  useUploadAvatarMutation,
  useUpdateBgMutation,
  useLazyGetUserInfoQuery,
  useDeleteAvatarMutation
} = employessApi;
