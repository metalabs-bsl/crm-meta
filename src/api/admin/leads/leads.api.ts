import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';

export const leadsMainApi = createApi({
  reducerPath: 'leadsApi',
  baseQuery: getBaseQuery(),
  tagTypes: ['Detail-Lead', 'Reminders', 'Calculator', 'Invoice'],
  endpoints: () => ({})
});
