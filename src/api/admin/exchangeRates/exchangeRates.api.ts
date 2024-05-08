import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IExchangeRate } from 'types/requests/exchangeRates.api';

export const exchangeRates = createApi({
  reducerPath: 'exchangeRates',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_EXCHANGE_RATE_API,
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${process.env.REACT_APP_EXCHANGE_RATE_TOKEN}`);
      headers.set('accept', 'application/json');
      return headers;
    }
  }),
  endpoints: ({ query }) => ({
    getExchangeRates: query<IExchangeRate.Response, IExchangeRate.Params>({
      query: () => '/api/v1/central'
    })
  })
});

export const { useGetExchangeRatesQuery } = exchangeRates;
