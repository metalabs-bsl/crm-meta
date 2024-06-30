import { createSlice } from '@reduxjs/toolkit';
import { ROLES } from 'types/roles';
import { IBgAction, IBgState } from 'types/store/admin/header.slice.types';
import { loginApi } from '../login/login.api';
import { employessApi } from './employees.api';

import { BG_TYPES } from 'types/enums';

const initialState: IBgState = {
  bgType: BG_TYPES.SECOND_TEXTURE,
  userInfo: null,
  role: ROLES.UNAUTHORIZED
};

export const employeesSlice = createSlice({
  name: 'employess',
  initialState,
  reducers: {
    setBg: (state, action: IBgAction) => {
      state.bgType = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addMatcher(employessApi.endpoints.getUserInfo.matchFulfilled, (state, { payload }) => {
      state.bgType = payload.background;
      state.userInfo = payload;
      state.role = payload.roles[0].role_name;
    });
    builder.addMatcher(loginApi.endpoints.logout.matchFulfilled, (state) => {
      state.userInfo = null;
      state.role = ROLES.UNAUTHORIZED;
    });
  }
});

export const { setBg } = employeesSlice.actions;
