import { appSettingsApi } from './appSettings/appSettings.api';
import { accountsApi } from './accounts/accounts.api';
import { calendarApi } from './calendar/calendar.api';
import { currenciesApi } from './currencies/currencies.api';
import { employeesApi } from './employees/employees.api';
import { historyApi } from './history/history.api';
import { kanbanApi } from './kanban/kanban.api';
import { leadsMainApi } from './leads/leads.api';
import { loginApi } from './login/login.api';
import { paymentCurrencyApi } from './paymentCurrency/paymentCurrency.api';
import { workTime } from './workTime/workTime.api';

export const adminApiReducers = {
  [paymentCurrencyApi.reducerPath]: paymentCurrencyApi.reducer,
  [currenciesApi.reducerPath]: currenciesApi.reducer,
  [loginApi.reducerPath]: loginApi.reducer,
  [leadsMainApi.reducerPath]: leadsMainApi.reducer,
  [employeesApi.reducerPath]: employeesApi.reducer,
  [workTime.reducerPath]: workTime.reducer,
  [kanbanApi.reducerPath]: kanbanApi.reducer,
  [appSettingsApi.reducerPath]: appSettingsApi.reducer,
  [historyApi.reducerPath]: historyApi.reducer,
  [calendarApi.reducerPath]: calendarApi.reducer,
  [accountsApi.reducerPath]: accountsApi.reducer
};

export const adminApiMiddlewares = [
  paymentCurrencyApi.middleware,
  currenciesApi.middleware,
  loginApi.middleware,
  leadsMainApi.middleware,
  employeesApi.middleware,
  accountsApi.middleware,
  workTime.middleware,
  kanbanApi.middleware,
  appSettingsApi.middleware,
  historyApi.middleware,
  calendarApi.middleware
];
