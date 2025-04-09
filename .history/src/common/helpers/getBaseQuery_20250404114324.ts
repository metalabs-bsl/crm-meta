import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import { RootState } from 'api';

export const getBaseQuery = () => {
  return fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).login.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        REACT_APP_WS_BASE_URL = "wss://2400-185-138-103-123.ngrok-free.app"
REACT_APP_BASE_URL="https://2400-185-138-103-123.ngrok-free.app"
      }
      return headers;
    }
  });
};
