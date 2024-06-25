import { createSlice } from '@reduxjs/toolkit';
import { ROLES } from 'types/roles';
import { IAuthorizedAaction, ILoginState } from 'types/store/admin/header.slice.types';
import { loginApi } from './login.api';

const initialState: ILoginState = {
  isAuthorized: false,
  role: ROLES.ADMIN
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setAuthorized: (state, action: IAuthorizedAaction) => {
      state.isAuthorized = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addMatcher(loginApi.endpoints.login.matchFulfilled, (_, { payload }) => {
      localStorage.setItem('accessToken', payload.accessToken);
      localStorage.setItem('refreshToken', payload.refreshToken);
    });
  }
});

export const { setAuthorized } = loginSlice.actions;
