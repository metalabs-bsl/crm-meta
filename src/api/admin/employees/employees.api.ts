import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { Options } from 'types/common';
import { IGetAllEmployees, IGetEmployeeRoles, IGetResponsibleEmployees, IGetUserInfo } from 'types/requests/admin/employees.api';

import { BG_TYPES } from 'types/enums';

export const employeesApi = createApi({
  reducerPath: 'employessApi',
  baseQuery: getBaseQuery(),
  tagTypes: ['EmployeesList'],
  endpoints: ({ query, mutation }) => ({
    getAllEmployees: query<IGetAllEmployees.Response, IGetAllEmployees.Params>({
      query: () => `/employees/all`,
      providesTags: ['EmployeesList']
    }),
    getResponsibleEmployees: query<Options[], IGetResponsibleEmployees.Params>({
      query: () => `/employees/all`,
      transformResponse: (data: IGetResponsibleEmployees.Response) => {
        return data.map((employee) => ({
          label: `${employee?.first_name} ${employee?.second_name}`,
          value: employee?.id
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
    deleteEmployee: mutation({
      query: (id: string) => ({
        method: 'DELETE',
        url: `/employees/${id}`
      }),
      invalidatesTags: ['EmployeesList']
    }),
    updateBg: mutation<void, BG_TYPES>({
      query: (background) => ({
        method: 'PATCH',
        url: `/employees/background/${background}`
      })
    }),
    updateEmployeeInfo: mutation({
      query: (employee) => ({
        method: 'PUT',
        url: `/employees/${employee.id}`,
        body: employee
      })
    }),
    getUserInfo: query<IGetUserInfo.Response, IGetUserInfo.Params>({
      query: () => `/employees`
    }),
    createEmployee: mutation<void, FormData>({
      query: (body) => ({
        method: 'POST',
        url: 'employees/create',
        body
      }),
      invalidatesTags: ['EmployeesList']
    }),
    getEmployeeRoles: query<IGetEmployeeRoles.Response, IGetEmployeeRoles.Params>({
      query: () => `/roles`
    }),
    getQRCode: query<{ qr_url: string }, { phone: string }>({
      query: ({ phone }) => ({
        url: `${process.env.REACT_APP_WS_BASE_URL}/whatsapp-account/qr`,
        params: { phone }
      })
    })
  })
});

export const {
  useGetAllEmployeesQuery,
  useGetResponsibleEmployeesQuery,
  useUploadAvatarMutation,
  useUpdateBgMutation,
  useLazyGetUserInfoQuery,
  useDeleteAvatarMutation,
  useCreateEmployeeMutation,
  useDeleteEmployeeMutation,
  useUpdateEmployeeInfoMutation,
  useGetEmployeeRolesQuery,
  useGetQRCodeQuery
} = employeesApi;
