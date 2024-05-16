import { createSlice } from '@reduxjs/toolkit';
import { ISidebarAction, ISidebarState } from 'types/store/admin/header.slice.types';

const initialState: ISidebarState = {
  isShowSidebar: true
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setChangeSidebarVisible: (state, action: ISidebarAction) => {
      state.isShowSidebar = action.payload;
    }
  }
});

export const { setChangeSidebarVisible } = sidebarSlice.actions;
