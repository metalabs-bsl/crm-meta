import { createSlice } from '@reduxjs/toolkit';
import { ROLES } from 'types/roles';
import { IAuthorizedAaction, ILoginState } from 'types/store/admin/header.slice.types';

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
  }
});

export const { setAuthorized } = loginSlice.actions;
