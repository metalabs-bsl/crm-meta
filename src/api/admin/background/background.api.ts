import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';

import { BG_TYPES } from 'types/enums';

export const backgroundApi = createApi({
  reducerPath: 'backgroundApi',
  baseQuery: getBaseQuery(),
  endpoints: ({ mutation }) => ({
    updateBg: mutation<void, BG_TYPES>({
      query: (background) => ({
        method: 'PATCH',
        url: `/employees/background/${background}`
      })
    })
  })
});

export const { useUpdateBgMutation } = backgroundApi;
