import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableRow } from 'pages/CRM/Deals/List/ListTable/ListTable';
import { loginApi } from '../login/login.api';

import { disconnectSocket } from 'socket';

interface SocketState {
  connected: boolean;
  list: TableRow;
  listAll: TableRow;
  loading: boolean;
}

const initialState: SocketState = {
  connected: false,
  list: { leads: [], stages: [] },
  listAll: { leads: [], stages: [] },
  loading: false
};

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setConnected(state, action: PayloadAction<boolean>) {
      state.connected = action.payload;
    },
    setListBoard(state, action: PayloadAction<TableRow>) {
      state.list = action.payload;
    },
    setListBoardAll(state, action: PayloadAction<TableRow>) {
      state.listAll = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addMatcher(loginApi.endpoints.logout.matchFulfilled, (state) => {
      state.list = { leads: [], stages: [] };
      disconnectSocket();
    });
  }
});

export const { setConnected, setListBoard, setListBoardAll, setLoading } = listSlice.actions;
