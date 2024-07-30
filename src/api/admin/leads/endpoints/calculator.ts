import { ICreatePayment, IGetCalc, IGetLeadAdditional, ISetTourInfo, IUpdateLeadCalcPaidStatus } from 'types/requests/admin/leads.api';
import { leadsMainApi } from '../leads.api';

export const calculatorApi = leadsMainApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getLeadCalc: query<IGetCalc.Response, IGetCalc.Params>({
      query: (leadId) => `/leadsCalculator/${leadId}`,
      providesTags: ['Calculator']
    }),
    updateLeadCalcAccess: mutation<void, string>({
      query: (calc_id) => ({
        method: 'PATCH',
        url: `/leadsCalculator/access/toggle/${calc_id}`
      }),
      invalidatesTags: ['Detail-Lead']
    }),
    updateLeadCalcPaidStatus: mutation<IUpdateLeadCalcPaidStatus.Response, IUpdateLeadCalcPaidStatus.Params>({
      query: ({ calc_id, paid_status }) => ({
        method: 'PATCH',
        url: `/leadsCalculator/payment/${calc_id}/status/${paid_status}`
      }),
      invalidatesTags: ['Detail-Lead']
    }),
    updateContract: mutation<void, FormData>({
      query: (body) => ({
        method: 'PATCH',
        url: `/leads-calculator-contract`,
        body
      }),
      invalidatesTags: ['Calculator']
    }),
    getLeadAdditionalPayments: query<IGetLeadAdditional.Response, void>({
      query: () => `/leads-calculator-additional-payments`,
      providesTags: ['Detail-Lead']
    }),
    createInvoice: mutation<void, FormData>({
      query: (formData) => ({
        method: 'POST',
        url: `/leads-invoice-for-payments`,
        body: formData
      }),
      invalidatesTags: ['Detail-Lead']
    }),
    choicePaymentToggle: mutation<void, string>({
      query: (id) => ({
        method: 'PATCH',
        url: `/leadsCalculator/change/payment/full/toggle/${id}`
      }),
      invalidatesTags: ['Calculator']
    }),
    setTourData: mutation<ISetTourInfo.Response, ISetTourInfo.Params>({
      query: (body) => ({
        method: 'POST',
        url: `/leads-calculator-tour-data`,
        body
      }),
      invalidatesTags: ['Calculator']
    }),
    createPayment: mutation<ICreatePayment.Response, ICreatePayment.Params>({
      query: (body) => ({
        method: 'POST',
        url: `/leads-calculator-payment-data`,
        body
      }),
      invalidatesTags: ['Calculator']
    })
  })
});

export const {
  useUpdateLeadCalcAccessMutation,
  useUpdateLeadCalcPaidStatusMutation,
  useLazyGetLeadCalcQuery,
  useUpdateContractMutation,
  useGetLeadAdditionalPaymentsQuery,
  useCreateInvoiceMutation,
  useChoicePaymentToggleMutation,
  useSetTourDataMutation,
  useCreatePaymentMutation
} = calculatorApi;
