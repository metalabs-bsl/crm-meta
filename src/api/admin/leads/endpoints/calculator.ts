import { IUpdateLeadCalcPaidStatus } from 'types/requests/admin/leads.api';
import { leadsMainApi } from '../leads.api';

const calculatorApi = leadsMainApi.injectEndpoints({
  endpoints: ({ mutation }) => ({
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
    })
  })
});

export const { useUpdateLeadCalcAccessMutation, useUpdateLeadCalcPaidStatusMutation } = calculatorApi;
