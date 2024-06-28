import { createApi } from '@reduxjs/toolkit/query/react';
import { Options } from 'types/pages';
import { getBaseQuery } from 'common/helpers';
import { IGetResponsibleEmployees } from 'types/requests/admin/employees.api';

export const employessApi = createApi({
  reducerPath: 'employessApi',
  baseQuery: getBaseQuery(),
  endpoints: ({ query, mutation }) => ({
    getResponsibleEmployees: query<Options[], IGetResponsibleEmployees.Params>({
      query: () => `/employees/all`,
      transformResponse: (data: IGetResponsibleEmployees.Response) => {
        return data.employees.map((employee) => ({
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
    })
  })
});

export const { useGetResponsibleEmployeesQuery, useUploadAvatarMutation } = employessApi;
