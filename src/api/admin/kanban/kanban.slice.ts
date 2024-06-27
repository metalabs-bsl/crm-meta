import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumn } from 'types/entities';

interface SocketState {
  connected: boolean;
  board: IColumn[];
  loading: boolean;
}

const initialState: SocketState = {
  connected: false,
  board: [],
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
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    }
  }
});

export const { setConnected, setBoard, setLoading } = kanbanSlice.actions;
