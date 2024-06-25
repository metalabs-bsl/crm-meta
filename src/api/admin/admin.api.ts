import { exchangeRates } from './exchangeRates/exchangeRates.api';
import { loginApi } from './login/login.api';

export const adminApiReducers = {
  [exchangeRates.reducerPath]: exchangeRates.reducer,
  [loginApi.reducerPath]: loginApi.reducer
};

export const adminApiMiddlewares = [exchangeRates.middleware, loginApi.middleware];
