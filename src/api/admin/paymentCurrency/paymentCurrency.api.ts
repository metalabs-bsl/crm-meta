import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { IGetPaymentCurrency } from 'types/requests/admin/leads.api';

export const paymentCurrencyApi = createApi({
  reducerPath: 'paymentCurrencyApi',
  baseQuery: getBaseQuery(),
  endpoints: ({ query }) => ({
    getPaymentCurrency: query<IGetPaymentCurrency.Response, IGetPaymentCurrency.Params>({
      query: () => '/leads-calculator-currencies'
    })
  })
});

export const { useGetPaymentCurrencyQuery } = paymentCurrencyApi;
