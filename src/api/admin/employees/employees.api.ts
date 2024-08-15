import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { Options } from 'types/common';
import { IGetAllEmployees, IGetEmployeeRoles, IGetResponsibleEmployees, IGetUserInfo } from 'types/requests/admin/employees.api';

import { BG_TYPES } from 'types/enums';

export const employessApi = createApi({
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
    deleteEMployee: mutation({
      query: (id: string) => ({
        method: 'DELETE',
        url: `/employees/${id}`
      })
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
        // headers: {
        //   'Content-Type': 'multipart/form-data'
        // }
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
    // получение паспортов (уточнить нужно ли оно ещё)
    getPassportFront: query({
      query: (employeeId) => `/employees/passport-front/${employeeId}`
    }),
    getPassportBack: query({
      query: (employeeId) => `/employees/passport-back/${employeeId}`
    }),
    getEmployeeRoles: query<IGetEmployeeRoles.Response, IGetEmployeeRoles.Params>({
      query: () => `/roles`
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
  useDeleteEMployeeMutation,
  useUpdateEmployeeInfoMutation,
  useGetPassportFrontQuery,
  useGetPassportBackQuery,
  useGetEmployeeRolesQuery
} = employessApi;
