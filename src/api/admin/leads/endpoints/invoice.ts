import { IGetInvoices, IGetInvoicesSelectData } from 'types/requests/admin/leads.api';
import { leadsMainApi } from '../leads.api';

export const invoiceApi = leadsMainApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    createInvoice: mutation<void, FormData>({
      query: (formData) => ({
        method: 'POST',
        url: `/leads-invoice-for-payments`,
        body: formData
      }),
      invalidatesTags: ['Invoice']
    }),
    getInvoices: query<IGetInvoices.Response, IGetInvoices.Params>({
      query: (leadId) => `/leads-invoice-for-payments/lead/${leadId}`,
      providesTags: ['Invoice']
    }),
    getPaymentsForInvoicesForm: query<IGetInvoicesSelectData.Response, IGetInvoicesSelectData.Params>({
      query: (leadId) => `/leads-invoice-for-payments/select/lead/${leadId}`,
      keepUnusedDataFor: 0
    }),
    deleteInvoice: mutation<void, string>({
      query: (invoiceId) => ({
        method: 'DELETE',
        url: `/leads-invoice-for-payments/${invoiceId}`
      }),
      invalidatesTags: ['Invoice']
    })
  })
});

export const { useCreateInvoiceMutation, useGetInvoicesQuery, useGetPaymentsForInvoicesFormQuery, useDeleteInvoiceMutation } = invoiceApi;
