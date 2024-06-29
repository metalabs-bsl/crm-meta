import { createSlice } from '@reduxjs/toolkit';
import { ROLES } from 'types/roles';
import { IAuthorizedAaction, ILoginState } from 'types/store/admin/header.slice.types';
import { loginApi } from './login.api';

const initialState: ILoginState = {
  isAuthorized: false,
  role: ROLES.UNAUTHORIZED,
  accessToken: localStorage.getItem('accessToken') || null,
  userInfo: null
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
    builder.addMatcher(loginApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      localStorage.setItem('accessToken', payload.accessToken);
      localStorage.setItem('refreshToken', payload.refreshToken);
      state.accessToken = payload.accessToken;
    });
    builder.addMatcher(loginApi.endpoints.getUserInfo.matchFulfilled, (state, { payload }) => {
      state.role = payload.roles[0];
      state.userInfo = payload;
    });
    builder.addMatcher(loginApi.endpoints.logout.matchFulfilled, (state) => {
      (state.userInfo = null), (state.role = ROLES.UNAUTHORIZED), (state.accessToken = null);
      localStorage.clear();
    });
  }
});

export const { setAuthorized } = loginSlice.actions;
