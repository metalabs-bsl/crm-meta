import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { IGetCurrenciesLast } from 'types/requests/admin/currencies.api';

export const currenciesApi = createApi({
  reducerPath: 'currenciesApi',
  baseQuery: getBaseQuery(),
  endpoints: ({ query }) => ({
    getCurrenciesLast: query<IGetCurrenciesLast.Response, IGetCurrenciesLast.Params>({
      query: () => '/currencies/last'
    })
  })
});

export const { useGetCurrenciesLastQuery } = currenciesApi;
