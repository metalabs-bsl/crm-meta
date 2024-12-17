import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Birthday, Note } from 'types/entities';
import { loginApi } from '../login/login.api';

import { disconnectSocket } from 'socket';

interface CalendarState {
  notes: Note[];
  birthdays: Birthday[];
  loading: boolean;
}

const initialState: CalendarState = {
  notes: [],
  birthdays: [],
  loading: false
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setNotes(state, action: PayloadAction<Note[]>) {
      state.notes = action.payload;
    },
    setBirthdays(state, action: PayloadAction<Birthday[]>) {
      state.birthdays = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addMatcher(loginApi.endpoints.logout.matchFulfilled, (state) => {
      state.notes = [];
      state.birthdays = [];
      disconnectSocket();
    });
  }
});

export const { setNotes, setBirthdays, setLoading } = calendarSlice.actions;

export const calendarReducer = calendarSlice.reducer;
