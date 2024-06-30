import { createSlice } from '@reduxjs/toolkit';
import { ISidebarAction, ISidebarState } from 'types/store/admin/header.slice.types';
import { leadsApi } from '../leads/leads.api';

const initialState: ISidebarState = {
  isShowSidebar: true,
  isOpenEdgeModal: false,
  isNewDeal: false
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setChangeSidebarVisible: (state, action: ISidebarAction) => {
      state.isShowSidebar = action.payload;
    },
    setChangeOpenEdgeModal: (state, action: ISidebarAction) => {
      state.isOpenEdgeModal = action.payload;
    },
    setIsNewDeal: (state, action: ISidebarAction) => {
      state.isNewDeal = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addMatcher(leadsApi.endpoints.createLead.matchFulfilled, (state) => {
      state.isOpenEdgeModal = false;
    });
  }
});

export const { setChangeSidebarVisible, setChangeOpenEdgeModal, setIsNewDeal } = sidebarSlice.actions;
