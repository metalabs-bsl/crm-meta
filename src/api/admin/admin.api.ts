import { employessApi } from './employees/employees.api';
import { exchangeRates } from './exchangeRates/exchangeRates.api';
import { leadsApi } from './leads/leads.api';
import { loginApi } from './login/login.api';
import { workTime } from './workTime/workTime.api';

export const adminApiReducers = {
  [exchangeRates.reducerPath]: exchangeRates.reducer,
  [loginApi.reducerPath]: loginApi.reducer,
  [leadsApi.reducerPath]: leadsApi.reducer,
  [employessApi.reducerPath]: employessApi.reducer,
  [workTime.reducerPath]: workTime.reducer
};

export const adminApiMiddlewares = [
  exchangeRates.middleware,
  loginApi.middleware,
  leadsApi.middleware,
  employessApi.middleware,
  workTime.middleware
];
