import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import { RootState } from 'api';

export const getBaseQuery = () => {
  return fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).login.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('ngrok-skip-browser-warning', 'true');
      }
      return headers;
    }
  });
};
