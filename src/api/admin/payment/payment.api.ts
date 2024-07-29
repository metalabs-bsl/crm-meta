import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { ICreatePayment } from 'types/requests/admin/leads.api';

export const paymentApi = createApi({
  reducerPath: 'payment',
  baseQuery: getBaseQuery(),
  endpoints: ({ mutation }) => ({
    createPayment: mutation<ICreatePayment.Response, ICreatePayment.Params>({
      query: (body) => ({
        method: 'POST',
        url: `/leads-calculator-payment-data`,
        body
      })
    })
  })
});

export const { useCreatePaymentMutation } = paymentApi;
