import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumn } from 'types/entities';
import { loginApi } from '../login/login.api';

import { disconnectSocket } from 'socket';

interface SocketState {
  connected: boolean;
  board: IColumn[];
  boardAll: IColumn[];
  loading: boolean;
}

const initialState: SocketState = {
  connected: false,
  board: [],
  boardAll: [],
  loading: false
};

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    setConnected(state, action: PayloadAction<boolean>) {
      state.connected = action.payload;
    },
    setBoard(state, action: PayloadAction<IColumn[]>) {
      state.board = action.payload;
    },
    setBoardAll(state, action: PayloadAction<IColumn[]>) {
      state.boardAll = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addMatcher(loginApi.endpoints.logout.matchFulfilled, (state) => {
      state.board = [];
      disconnectSocket();
    });
  }
});

export const { setConnected, setBoard, setBoardAll, setLoading } = kanbanSlice.actions;
