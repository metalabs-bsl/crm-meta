import { createSlice } from '@reduxjs/toolkit';
import { IBgAction, IBgState } from 'types/store/admin/header.slice.types';
import { loginApi } from '../login/login.api';

import { BG_TYPES } from 'types/enums';

const initialState: IBgState = {
  bgType: BG_TYPES.SECOND_TEXTURE
};

export const backgroundSlice = createSlice({
  name: 'background',
  initialState,
  reducers: {
    setBg: (state, action: IBgAction) => {
      state.bgType = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addMatcher(loginApi.endpoints.getUserInfo.matchFulfilled, (state, { payload }) => {
      state.bgType = payload.background;
    });
  }
});

export const { setBg } = backgroundSlice.actions;
