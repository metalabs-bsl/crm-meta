import { currenciesApi } from './currencies/currencies.api';
import { employessApi } from './employees/employees.api';
import { leadsApi } from './leads/leads.api';
import { loginApi } from './login/login.api';
import { workTime } from './workTime/workTime.api';

export const adminApiReducers = {
  [currenciesApi.reducerPath]: currenciesApi.reducer,
  [loginApi.reducerPath]: loginApi.reducer,
  [leadsApi.reducerPath]: leadsApi.reducer,
  [employessApi.reducerPath]: employessApi.reducer,
  [workTime.reducerPath]: workTime.reducer
};

export const adminApiMiddlewares = [
  currenciesApi.middleware,
  loginApi.middleware,
  leadsApi.middleware,
  employessApi.middleware,
  workTime.middleware
];
