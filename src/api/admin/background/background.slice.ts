import { createSlice } from '@reduxjs/toolkit';
import { IBgAction, IBgState } from 'types/store/admin/header.slice.types';

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
  }
});

export const { setBg } = backgroundSlice.actions;
