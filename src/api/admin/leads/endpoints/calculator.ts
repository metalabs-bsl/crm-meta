import { Options } from 'types/common';
import {
  ICreatePayment,
  IGetCalc,
  IGetLeadAdditional,
  IGetServises,
  ISetAdditionalPayment,
  ISetContract,
  ISetTourInfo,
  IUpdateLeadCalcPaidStatus,
  IUploadPassport
} from 'types/requests/admin/leads.api';
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
    updateContract: mutation<ISetContract.Response, ISetContract.Params>({
      query: (body) => ({
        method: 'PATCH',
        url: `/leads-calculator-contract`,
        body
      }),
      invalidatesTags: ['Calculator', 'Invoice']
    }),
    getLeadAdditionalPayments: query<IGetLeadAdditional.Response, void>({
      query: () => `/leads-calculator-additional-payments`,
      providesTags: ['Detail-Lead']
    }),
    setAdditionalPayment: mutation<ISetAdditionalPayment.Response, ISetAdditionalPayment.Params>({
      query: (body) => ({
        method: 'POST',
        url: `/leads-calculator-additional-payments`,
        body
      }),
      invalidatesTags: ['Calculator']
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
      invalidatesTags: ['Calculator', 'Invoice']
    }),
    createPayment: mutation<ICreatePayment.Response, ICreatePayment.Params>({
      query: (body) => ({
        method: 'POST',
        url: `/leads-calculator-payment-data`,
        body
      }),
      invalidatesTags: ['Calculator']
    }),
    deletePayment: mutation<void, string>({
      query: (paymentId) => ({
        method: 'DELETE',
        url: `/leads-calculator-payment-data/${paymentId}`
      }),
      invalidatesTags: ['Calculator']
    }),
    uploadBackPassport: mutation<IUploadPassport.Response, IUploadPassport.Params>({
      query: ({ body, customerId }) => ({
        method: 'POST',
        url: `/customer/upload/passport-back/${customerId}`,
        body
      }),
      invalidatesTags: ['Calculator']
    }),
    uploadFrontPassport: mutation<IUploadPassport.Response, IUploadPassport.Params>({
      query: ({ body, customerId }) => ({
        method: 'POST',
        url: `/customer/upload/passport-front/${customerId}`,
        body
      }),
      invalidatesTags: ['Calculator']
    }),
    deleteFile: mutation<void, string>({
      query: (file_id) => ({
        method: 'DELETE',
        url: `/files/${file_id}`
      }),
      invalidatesTags: ['Calculator']
    }),
    getServises: query<Options[], IGetServises.Params>({
      query: () => `/leads-calculator-tour-data/product`,
      transformResponse: (data: IGetServises.Response) => {
        return data.map(({ id, name }) => ({
          label: name,
          value: id
        }));
      }
    }),
    getBrands: query<Options[], IGetServises.Params>({
      query: () => `/leads-calculator-tour-data/brand`,
      transformResponse: (data: IGetServises.Response) => {
        return data.map(({ id, name }) => ({
          label: name,
          value: id
        }));
      }
    })
  })
});

export const {
  useUpdateLeadCalcAccessMutation,
  useUpdateLeadCalcPaidStatusMutation,
  useLazyGetLeadCalcQuery,
  useUpdateContractMutation,
  useGetLeadAdditionalPaymentsQuery,
  useChoicePaymentToggleMutation,
  useSetTourDataMutation,
  useCreatePaymentMutation,
  useDeletePaymentMutation,
  useSetAdditionalPaymentMutation,
  useUploadBackPassportMutation,
  useUploadFrontPassportMutation,
  useDeleteFileMutation,
  useGetServisesQuery,
  useGetBrandsQuery
} = calculatorApi;
