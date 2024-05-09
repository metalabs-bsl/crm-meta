import { exchangeRates } from './exchangeRates/exchangeRates.api';

export const adminApiReducers = {
  [exchangeRates.reducerPath]: exchangeRates.reducer
};

export const adminApiMiddlewares = [exchangeRates.middleware];
