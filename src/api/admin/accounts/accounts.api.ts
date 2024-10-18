import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { IGetAllAccounts, IGetUnpaidInvoicesCount } from 'types/requests/admin/accounts.api';

export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  baseQuery: getBaseQuery(),
  tagTypes: ['AccountsList'],
  endpoints: ({ query, mutation }) => ({
    getAllAccounts: query<IGetAllAccounts.Response, IGetAllAccounts.Params>({
      query: (isFull) => `/leads-invoice-for-payments/page?isFull=${isFull}`,
      providesTags: ['AccountsList']
    }),
    updateInvoice: mutation<void, FormData>({
      query: (body) => ({
        method: 'PATCH',
        url: '/leads-invoice-for-payments/update',
        body
      }),
      invalidatesTags: ['AccountsList']
    }),
    getUnpaidInvoicesCount: query<IGetUnpaidInvoicesCount.Response, IGetUnpaidInvoicesCount.Params>({
      query: () => '/leads-invoice-for-payments/unpaid-invoices/count'
    })
  })
});

export const { useGetAllAccountsQuery, useUpdateInvoiceMutation, useGetUnpaidInvoicesCountQuery } = accountsApi;
